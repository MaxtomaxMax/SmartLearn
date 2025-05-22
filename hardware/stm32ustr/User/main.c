#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "Serial.h"
#include "Key.h"



int main(void)
{
	OLED_Init();
	Key_Init();
	
	Serial_Init();
	MyDMA_Init();
	
	OLED_ShowString(1, 1, "RxPacket");
	
	while (1)
	{
		if (Serial_GetRxFlag() == 1)
		{
			OLED_ShowHexNum(2, 1, txdata[0], 2);
			OLED_ShowHexNum(2, 4, txdata[1], 2);
			OLED_ShowHexNum(2, 7, txdata[2], 2);
			OLED_ShowHexNum(2, 10, txdata[3], 2);
			OLED_ShowHexNum(3, 1, txdata[4], 2);
			OLED_ShowHexNum(3, 4, txdata[5], 2);
			OLED_ShowHexNum(3, 7, txdata[6], 2);
			OLED_ShowHexNum(3, 10, txdata[7], 2);
			 //DMA_Cmd(DMA1_Channel4, ENABLE);
			//Serial_SendArray(txdata,21);
			
		}
	}
}
