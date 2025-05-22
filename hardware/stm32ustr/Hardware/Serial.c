#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "Key.h"
#include <stdio.h>
#include <stdarg.h>
#include "string.h"
#include "Serial.h"

uint8_t Serial_TxPacket[4];				//FF 01 02 03 04 FE
uint8_t Serial_RxPacket[4];
uint8_t Serial_RxFlag0A13;
uint8_t rxdatalen;
uint8_t txdata[21];
uint8_t txdatalen;
uint8_t USART1_TX_FLAG;


void Serial_Init(void)
{
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_USART1, ENABLE);
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);
	
	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP;
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_9;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);
	
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU;
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_10;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);
	
	USART_InitTypeDef USART_InitStructure;
	USART_InitStructure.USART_BaudRate = 2000000;
	USART_InitStructure.USART_HardwareFlowControl = USART_HardwareFlowControl_None;
	USART_InitStructure.USART_Mode = USART_Mode_Tx | USART_Mode_Rx;
	USART_InitStructure.USART_Parity = USART_Parity_No;
	USART_InitStructure.USART_StopBits = USART_StopBits_1;
	USART_InitStructure.USART_WordLength = USART_WordLength_8b;
	USART_Init(USART1, &USART_InitStructure);
	
	USART_ITConfig(USART1, USART_IT_RXNE, ENABLE);
	
	NVIC_PriorityGroupConfig(NVIC_PriorityGroup_2);
	
	NVIC_InitTypeDef NVIC_InitStructure;
	NVIC_InitStructure.NVIC_IRQChannel = USART1_IRQn;
	NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE;
	NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 1;
	NVIC_InitStructure.NVIC_IRQChannelSubPriority = 1;
	NVIC_Init(&NVIC_InitStructure);
	
	USART_ITConfig(USART1,USART_IT_IDLE,ENABLE);
	
	USART_Cmd(USART1, ENABLE);
}
void MyDMA_Init(void)
{
	RCC_AHBPeriphClockCmd(RCC_AHBPeriph_DMA1, ENABLE);
	
    DMA_InitTypeDef DMA_InitStructure;
	
	DMA_DeInit(DMA1_Channel4);
	DMA_InitStructure.DMA_PeripheralBaseAddr = (uint32_t)&(USART1->DR);   //外设站点起始地址
	DMA_InitStructure.DMA_PeripheralDataSize = DMA_PeripheralDataSize_Byte;//DMA按字节转运
	DMA_InitStructure.DMA_PeripheralInc = DMA_PeripheralInc_Disable; //外设站点地址不自增
	DMA_InitStructure.DMA_MemoryBaseAddr =(uint32_t)txdata;//存储器站点起始地址
	DMA_InitStructure.DMA_MemoryDataSize = DMA_MemoryDataSize_Byte;
	DMA_InitStructure.DMA_MemoryInc = DMA_MemoryInc_Enable; //存储器站点自增

	DMA_InitStructure.DMA_DIR = DMA_DIR_PeripheralDST;    //存储器站点到外设站点   //传输方向
	DMA_InitStructure.DMA_BufferSize = 21;//缓冲区大小，传输计数器
	DMA_InitStructure.DMA_Mode = DMA_Mode_Normal;  //普通模式，不循环
	DMA_InitStructure.DMA_M2M = DMA_M2M_Disable;  //失能（不是存储器到存储器）
	DMA_InitStructure.DMA_Priority = DMA_Priority_High; //优先级
	DMA_Init(DMA1_Channel4, &DMA_InitStructure);
	
	USART_DMACmd(USART1,USART_DMAReq_Tx,ENABLE); //使能串口1的DMA发送
    //DMA1通道4 NVIC 配置
	
	/*DMA_ITConfig(DMA1_Channel4,DMA_IT_TC,ENABLE);
	
	NVIC_PriorityGroupConfig(NVIC_PriorityGroup_2);
	NVIC_InitTypeDef NVIC_InitStructure;
	NVIC_InitStructure.NVIC_IRQChannel = DMA1_Channel4_IRQn;				//NVIC通道设置
	NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 3 ;				//抢占优先级
	NVIC_InitStructure.NVIC_IRQChannelSubPriority = 1;						//子优先级
	NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE;							//IRQ通道使能
	NVIC_Init(&NVIC_InitStructure);	*/										//根据指定的参数初始化NVIC寄存器

	DMA_Cmd(DMA1_Channel4, DISABLE);; //使能DMA1的TX通道（DMA1_Channel4）

}


/*void DMA_USART1_Tx_Data( u32 size)
{
	DMA1_Channel4->CNDTR = size;    			//设置要发送的字节数目
	DMA_Cmd(DMA1_Channel4, ENABLE);				//开始DMA发送
}

void DMA1_Channel4_IRQHandler(void)
{
      if(DMA_GetITStatus(DMA1_IT_TC4)!= RESET)	//DMA接收完成标志
	{
		DMA_ClearITPendingBit(DMA1_IT_TC4); 	//清除中断标志 
		USART_ClearFlag(USART1,USART_FLAG_TC);	//清除串口1的标志位
		DMA_Cmd(DMA1_Channel4, DISABLE );   	//关闭USART1 TX DMA1 所指示的通道
								//USART1发送标志(关闭)
	}
}*/             


void Serial_SendByte(uint8_t Byte)
{
	USART_SendData(USART1, Byte);
	while (USART_GetFlagStatus(USART1, USART_FLAG_TXE) == RESET);
}

void Serial_SendArray(uint8_t *Array, uint16_t Length)//发送数组
{
	uint16_t i;
	for (i = 0; i < Length; i ++)
	{
		Serial_SendByte(Array[i]);
	}
}

void Serial_SendString(char *String)
{
	uint8_t i;
	for (i = 0; String[i] != '\0'; i ++)
	{
		Serial_SendByte(String[i]);
	}
}

uint32_t Serial_Pow(uint32_t X, uint32_t Y)
{
	uint32_t Result = 1;
	while (Y --)
	{
		Result *= X;
	}
	return Result;
}

void Serial_SendNumber(uint32_t Number, uint8_t Length)
{
	uint8_t i;
	for (i = 0; i < Length; i ++)
	{
		Serial_SendByte(Number / Serial_Pow(10, Length - i - 1) % 10 + '0');
	}
}

int fputc(int ch, FILE *f)
{
	Serial_SendByte(ch);
	return ch;
}

void Serial_Printf(char *format, ...)
{
	char String[100];
	va_list arg;
	va_start(arg, format);
	vsprintf(String, format, arg);
	va_end(arg);
	Serial_SendString(String);
}


void Serial_SendPacket(void)
{
	Serial_SendByte(0xFF);
	Serial_SendArray(Serial_TxPacket, 4);
	Serial_SendByte(0xFE);
}

uint8_t Serial_GetRxFlag(void)
{
	if (Serial_RxFlag0A13 == 1)
	{
		Serial_RxFlag0A13 = 0;
		return 1;
	}
	return 0;
}
usart_data usart1_rxdata;

void USART1_IRQHandler(void)
{            
	
	       uint16_t clear;
	        if (USART_GetITStatus(USART1, USART_IT_RXNE) == SET)
	        {
				
	         usart1_rxdata.Buffer[usart1_rxdata.Lenth]=USART_ReceiveData(USART1);
             usart1_rxdata.Lenth++;
		     USART_ClearITPendingBit(USART1, USART_IT_RXNE);
		    	
	        } 
	        else if(USART_GetITStatus(USART1,USART_IT_IDLE)==SET)
	        {
		      
				if(usart1_rxdata.Buffer[6]==0x13)//接收到0A13的数据帧，将其赋值给发送数组，并将接收到0A13标志置零
		        {
				 
		          for(txdatalen=0;txdatalen<usart1_rxdata.Lenth;txdatalen++)
		          {
			        txdata[txdatalen]=usart1_rxdata.Buffer[txdatalen];
		          }
		         Serial_RxFlag0A13=1;
				
				 DMA_Cmd(DMA1_Channel4, DISABLE);  // 关闭 DMA 通道
				 DMA_SetCurrDataCounter(DMA1_Channel4, 21);  // 重新设置 DMA 传输数据长度
				 DMA_Cmd(DMA1_Channel4, ENABLE);
				
		        }
			   
	            memset(usart1_rxdata.Buffer,'\0',usart1_rxdata.Lenth);
		        usart1_rxdata.Lenth=0;
		        clear=USART1->SR;
		        clear=USART1->DR;
		        
			   USART_ClearITPendingBit(USART1,USART_IT_IDLE);
	     }
}
