#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEScan.h>
#include <BLEAdvertisedDevice.h>

#define SCAN_TIME 5 // Scan for 5 seconds

class MyAdvertisedDeviceCallbacks : public BLEAdvertisedDeviceCallbacks {
    void onResult(BLEAdvertisedDevice advertisedDevice) {
        if (advertisedDevice.haveManufacturerData()) {
            String manufacturerData = advertisedDevice.getManufacturerData();
            
            // Check if the manufacturer data matches our expected format
            if (manufacturerData.length() == 14 && manufacturerData[0] == 0xE0 && manufacturerData[1] == 0x00) { // As my code has 2(Company identifier)[0-1] + 12(Manufacturer data)[2-13] // Checking company identifier (I used google here)
                // Extract and print UUID
                if (advertisedDevice.haveServiceUUID()) {
                    BLEUUID deviceUUID = advertisedDevice.getServiceUUID();
                    Serial.print("Found device with matching UUID: ");
                    Serial.println(deviceUUID.toString().c_str());
                }
                
                // Print manufacturer data
                Serial.println("Manufacturer Data:");
                Serial.print("  Protocol Version: ");
                Serial.println(manufacturerData[2], HEX);
                
                uint16_t appIdentifier = (manufacturerData[3] << 8) | manufacturerData[4]; // extracting a 16-bit application identifier value from the manufacturer data payload of the BLE advertisement.
                Serial.print("  App Identifier: 0x");
                Serial.println(appIdentifier, HEX);
                
                Serial.print("  Transmit Power: ");
                Serial.println((int8_t)manufacturerData[5]);
                
                Serial.print("  Rotating Identifier: ");
                for (int i = 6; i < 14; i++) {
                    Serial.print(manufacturerData[i], HEX);
                    if (i < 13) Serial.print(":");
                }
                Serial.println();
                Serial.println();
            }
        }
    }
};

void setup() {
    Serial.begin(115200);
    Serial.println("ESP32 BLE Scanner");

    BLEDevice::init("");
    BLEScan* pBLEScan = BLEDevice::getScan();
    pBLEScan->setAdvertisedDeviceCallbacks(new MyAdvertisedDeviceCallbacks());
    pBLEScan->setActiveScan(true);
    pBLEScan->setInterval(100);
    pBLEScan->setWindow(99);
}

void loop() {
    Serial.println("Scanning...");
    BLEScan* pBLEScan = BLEDevice::getScan();
    BLEScanResults* foundDevices = pBLEScan->start(SCAN_TIME, false);
    pBLEScan->clearResults();
    delay(2000);
}