export const LAYER_SCRIPTS = {
    TRUE_COLOR: `
        function setup() {
            return {
                input: [{ bands: ["B02", "B03", "B04"] }],
                output: { bands: 3 }
            };
        }
        function evaluatePixel(sample) {
            return [sample.B04, sample.B03, sample.B02];
        }
    `,
    NDVI: `
        function setup() {
            return {
                input: [{ bands: ["B08", "B04"] }],
                output: { bands: 1 }
            };
        }
        function evaluatePixel(sample) {
            return [(sample.B08 - sample.B04) / (sample.B08 + sample.B04)];
        }
    `,
    NDTI: `
        function setup() {
            return {
                input: [{ bands: ["B11", "B12"] }],
                output: { bands: 1 }
            };
        }
        function evaluatePixel(sample) {
            return [(sample.B11 - sample.B12) / (sample.B11 + sample.B12)];
        }
    `,
    STUBBLE: `
        function setup() {
            return {
                input: [{ bands: ["B02", "B03", "B04", "B08", "B11", "B12"] }],
                output: { bands: 1 }
            };
        }

        const ndvi_threshold = 0.3;
        const ndti_threshold = 0.1;

        function evaluatePixel(sample) {
            const ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04);
            const ndti = (sample.B11 - sample.B12) / (sample.B11 + sample.B12);
            const isMatureStubble = (ndvi < ndvi_threshold) && (ndti > ndti_threshold);
            return [isMatureStubble ? 1 : 0];
        }
    `,
    STUBBLE_2: `
        function setup() {
            return {
                input: [{ bands: ["B02", "B03", "B04", "B08", "B11", "B12"] }],
                output: { bands: 1 }
            };
        }

        const ndvi_threshold = 0.2;
        const ndwi_threshold = 0.1;
        const ndti_threshold = 0.15;

        function evaluatePixel(sample) {
            const ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04);
            const ndwi = (sample.B08 - sample.B11) / (sample.B08 + sample.B11);
            const ndti = (sample.B11 - sample.B12) / (sample.B11 + sample.B12);
            const isDryStubble = (ndvi < ndvi_threshold) && (ndwi < ndwi_threshold) && (ndti > ndti_threshold);
            return [isDryStubble ? 1 : 0];
        }
    `
};
