#include "DHT.h"

#define DHTPIN A2  
#define DHTTYPE DHT11 
int gas = A0;

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
 }

void loop() {
  delay(2000);
  delay(1000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  float hif = dht.computeHeatIndex(f, h);
  float hic = dht.computeHeatIndex(t, h, false);
  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("C "));
  Serial.print(f);
  Serial.print(F("F  Heat index: "));
  Serial.print(hic);
  Serial.print(F("C "));
  Serial.print(hif);
  Serial.println(F("F"));

  int analogSensor = analogRead(gas);
  Serial.print("Gas: ");
  Serial.print(analogSensor);
  if(t>0 && t<35){
    if(h>40 && h<70){ 
      if (analogSensor <150){
        Serial.print(" Sensing...");
        Serial.println("");
    }
    else if(analogSensor>=150 && analogSensor<250){
      Serial.print("  Food is Fresh..!");
      Serial.println("");
   }
    else if(analogSensor>=250 && analogSensor<400){
      Serial.print("  Food is not fit to consume..!");
      Serial.println("");
   }
  }
  else{
    Serial.print("  Food is not fit to consume..!");
    Serial.println("");
  }
 }
 else{
    Serial.print("  Food is not fit to consume..!");
    Serial.println("");
 }

}
