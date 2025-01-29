import { FlowmapCity, ProjectConfig } from '@flowmapcity/sdk';
import { useEffect, useRef } from 'react';

const BASE_URL = 'https://madzieboyles.github.io/MappingProject/';

const COLOR_SCHEME =
  '#f7fcfd,#e0ecf4,#bfd3e6,#9ebcda,#8c96c6,#8c6bb1,#88419d,#810f7c,#4d004b';

const config: ProjectConfig = {
  dataSources: [
    // Currently .parquet and .csv files are supported
    {
      type: 'url',
      tableName: 'Country_Codes_Coord',
      url: `${BASE_URL}/Country_Codes_Coord.csv`,
    },
    {
      type: 'url',
      tableName: 'TradelinesFinal_January8',
      url: `${BASE_URL}/TradelinesFinal_January8.csv`,
    },
  ],
  views: [
    {
      id: 'flowmap',
      type: 'od-flowmap',
      columnMapping: {
        locations: {
          tableName: 'Country_Codes_Coord',
          columns: {
            id: 'Country_code_M49',
            name: 'Country_name',
            lat: 'lat',
            lon: 'long',
          },
        },
        flows: {
          tableName: 'TradelinesFinal_January8',
          columns: {
            origin: 'Partner_Country_Code__M49_',
            dest: 'Reporter_Country_Code__M49_',
            count: 'FoodShocks60',
          },
        },
      },
      viewport: { longitude: 0, latitude: 20, zoom: 1 },
      settings: { colorScheme: COLOR_SCHEME.split(',') },
    },
  ],
};

function SixtyFlow() {
  const containerRef1 = useRef<HTMLDivElement>(null);
  const flowmapCityRef = useRef<FlowmapCity>();
  useEffect(() => {
    if (containerRef1.current && !flowmapCityRef.current) {
      const flowmapCity = new FlowmapCity({
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2YmEyZjQxLTQ5ZDUtNDRhOC1hNjljLTRmYTkyMzAyZTQ0OCIsImlhdCI6MTczNDU0MTk5OH0.d3LS6eGSWlQQkSc0_FGOdhQ4jT2O9C19c6eijL2fGaI',
        container: containerRef1.current,
        config,
        options: { readOnly: true, showSidebar: true },
      });
      flowmapCityRef.current = flowmapCity;
    }
  }, []);
  return <div ref={containerRef1}></div>;
}

export {SixtyFlow};

