#ifndef __SERIAL_H
#define __SERIAL_H

#include <stdio.h>

#define RECEIVE_BUF_MAX_SIZE 100

typedef struct{
	uint8_t Buffer[RECEIVE_BUF_MAX_SIZE];
	uint16_t Lenth;
}usart_data;

extern uint8_t Serial_TxPacket[];
extern uint8_t Serial_RxPacket[];
extern uint8_t rxdatalen;
extern uint8_t txdatalen;
extern uint8_t txdata[21];

void Serial_Init(void);
void Serial_SendByte(uint8_t Byte);
void Serial_SendArray(uint8_t *Array, uint16_t Length);
void Serial_SendString(char *String);
void Serial_SendNumber(uint32_t Number, uint8_t Length);
void Serial_Printf(char *format, ...);
void MyDMA_Init(void);
void Serial_SendPacket(void);
uint8_t Serial_GetRxFlag(void);

#endif
