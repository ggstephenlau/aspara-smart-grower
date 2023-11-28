# aspara micro:bit MakeCode Extension
This is the micro:bit MakeCode Extension for controlling the aspara Smart Grower by [Growgreen Limited](https://www.grow-green.com/)

<img src="./pngs/stylist.png" alt="image" width="300" height="auto">
<img src="./pngs/microbit.png" alt="image" width="200" height="auto">

## How to add aspara micro:bit MakeCode Extension to your MakeCode project

* Create/Open a MakeCode project using the micro:bit MakeCode Editor at https://makecode.microbit.org
* Click the cog icon in the top right, then select <I> "Project Settings"</I>

    <img src="./pngs/proj_init_settings.png" width=195 height=91>

* Enable the <I><U>"No Pairing Required: Anyone can connect via Bluetooth."</U></I> and <I>"Save"</I>

    <img src="./pngs/proj_init_options.png" width=318 height=140>

* In the web editor, click on <I>"Extensions"</I> to add extensions to the project

    <img src="./pngs/proj_ext_b4.png" width=114 height=245>

* Enter "<I><B>https://github.com/ggstephenlau/aspara-stylist</B></I>" and search

    <img src="./pngs/proj_ext_search.png" width=600 height=190>

* Select the aspara micro:bit MakeCode Extension from the search results.

    <img src= "./pngs/proj_ext_result.png" width=111 height=125>

* Select <I>"Remvoe extension(s) and add aspara-stylist"</I> if a pop-up appears with the message <I>"Some extensions will be removed"</I>

    <img src="./pngs/proj_ext_popup.png" width=360 height=107>

* <I>"aspara Stylist"</I> will show up in the editor and be ready to use.

    <img src="./pngs/proj_ext_complete.png" width=110 height=129 >

## How to use the extension
### On start - assign an unique microbit ID for the project
* Add <I><U>"start aspara Stylist service with microbit ID"</U></I> from the aspara Stylist extension to the block <I><U>"on start"</U></I>
* Enter an ID for this project.
* E.g.

    <img src="./pngs/proj_microbit_id.png" width=524 height=198/>
### Control blocks
* Set LED (red/blue/white) lights intensity (0 - 100)%

    <img src="./pngs/block_set_led_lights.png" width=327 height=65/>

* Set front panel indicators (8 indicators) on/off

    <img src="./pngs/block_set_indicators.png" width=279 height=71/>

* Set pump on/off

    <img src="./pngs/block_set_pump.png" width=165 height=61/>
    
* Play a short/long beep sound

    <img src="./pngs/block_make_beep.png" width=206 height=62/>

### Value blocks
* (red/blue/white) LED intensity (0 - 100)%

    <img src="./pngs/block_data_led_light_intensity.png" width=249 height=51/>

* Indicators (1 - 8) state (on / off)

    <img src="./pngs/block_data_indicator_state.png" width=235 height=52/>

* Pump state (on / off)

    <img src="./pngs/block_data_pump_state.png" width=195 height=48/>

* Room temperature (°C) from wireless planting sensor

    <img src="./pngs/block_data_temperature.png" width=171 height=41/>
    
* Relative humidity (%) from wireless planting sensor

    <img src="./pngs/block_data_humidity.png" width=208 height=40/>

* Light intensity (Lux) from wireless planting sensor

    <img src="./pngs/block_data_light_intensity.png" width=212 height=41/>

* Nutrient level (μS/cm) from wireless planting sensor.

    <img src="./pngs/block_data_nutrient_level.png" width=217 height=40/>

* Battery level from wireless planting sensor

    <img src="./pngs/block_data_battery_level.png" width=175 height=44/>

* Real time clock (year, month, day, hour, minute, second)

    <img src="./pngs/block_data_datetime.png" width=449 height=40/>

## Setup
* Assign an unique micro:bit ID for this project.
* Download and Run the project.
* Use the aspara STEM app to pair the aspara Smart Grower and aspara Wireless Planting Sensor with the micro:bit.

## Sample micro:bit projects using aspara Stylist extension
### Following are aspara Stylist microbit projects which could be imported to the microbit makecode editor for demo purposes.
* <I><B>https://github.com/ggstephenlau/aspara-stylist/example/aspara-simple-demo</B></I>
* <I><B>https://github.com/ggstephenlau/aspara-stylist/example/aspara-demo</B></I>
* <I><B>https://github.com/ggstephenlau/aspara-stylist/example/aspara-planting-demo</B></I>

