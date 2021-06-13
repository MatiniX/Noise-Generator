# Noise Generator
A simple noise generator build using React and TypeScript 

https://matinix.github.io/Noise-Generator/
## Usage
You can create your own noise based on some configurable option that are availible to you.
#### 1. Noise Type
You can choose from 4 noise types:
1. Value
2. Perlin
3. Simplex
4. Worley

There are 1D and 2D version for every noise type except Worley (this noise type is not defined in 1D)

#### 2. Offset and Scale
You can change offset of the sampled noise along both axis independently.

Frequency setting allows you to change the frequency of sampled noise effectively changing the scale of the sample.

You can also choose resolution which suits your needs. Supported resolution are exponents of 2 starting from 16x16 up to 2048x2048. Resolution you choose will affect the final downloaded image.

#### 3. Fractal Settings
Fractal noise is supported for every noise type.

You can configure all the basic fractal settings:
1. Octaves - number of samples included in the final sample (1-8)
2. Lacunarity - factor by which is frequency scaled for each next ocatve (1-4)
3. Persistance - factor by which is the amplitude scaled for each next octave (0-1)

#### 4. Gradient Settings
This setting enables you to color the final texture bassed on the sample values.

#### 5. Download button
Simply downloads the current texture as .png file.

### Performance
All computation are done synchronously on CPU. So if you experience large performance issues try to lower the resolution or turning off sampling gradient in Gradient Settings.
There were attempts to make noise sampling more performant, unfortunately they were unsuccsessful.

### Info
App was build as an learning project. I am still pretty much beginner to React and building applications. There is minimum of external libraries and components used only the Gradient picker and abilty to zoom and pan the texture are build with help of some externals. All the code and CSS was created by me with a little bit of help from the internet (mainly CSS). Feel free to create, download and use noise texture in your projects.

### Sources
Implementation of noise algorithms would not be possible without these great sources:
https://catlikecoding.com/unity/tutorials/pseudorandom-noise/old.html

https://thebookofshaders.com/
