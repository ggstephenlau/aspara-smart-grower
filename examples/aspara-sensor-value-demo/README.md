## Introduction
* To demo the uses of the values from <B>aspara Wireless Planting Sensor</B> in the <B>aspara Smart Grower</B> MakeCode extension.
<img src="../../pngs/values_prog_blocks.png" width=1059 height=774>

## Control actions
* Press the "A" button would turn on the "RED" and "WHITE" led lights.
* Press the "B" button would turn on the "BLUE" and "WHITE" led lights.
* Press the "A+B" button would toggle the pump on/off state.
* Shack the micro:bit would beep the aspara Smart Grower.

## Use the Light Values from aspara Wireless Planting Sensor to turn on/off the aspara Smart Grower led lights.
* If you place an aspara Wireless Planting Sensor under the LED lights of the aspara Smart Grower and press "A" or "B" button, the LED light values would feed back to the micro:bit, and then the micro:bit would turn off the LED lights automatically if the value is higher than a threshold.
* If you use a finger to cover the light window on the aspara Wireless Planting Sensor, the LED light values would feed back to the micro:bit, and the micro:bit would turn on the WHITE led light if the value is lower than a threshold.

* If you inspect the data from the <B>"Show data from device"</B>, you could see, for example,
<img src="../../pngs/sensor_data_values.png" width=2354 height=739>

## Compatibility

* Works with <B>micro:bit V2</B> hardware only



> Open this page at [https://ggstephenlau.github.io/aspara-sensor-value-demo/](https://ggstephenlau.github.io/aspara-sensor-value-demo/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/ggstephenlau/aspara-sensor-value-demo** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/ggstephenlau/aspara-sensor-value-demo** and click import

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
