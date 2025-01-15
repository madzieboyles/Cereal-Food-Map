import { FlowmapCity, ProjectConfig } from '@flowmapcity/sdk';
import { useEffect, useRef } from 'react';

const BASE_URL = 'https://madzieboyles.github.io/MappingProject/';

const COLOR_SCHEME =
  '#ffffe0,#c5eddf,#a5d5d8,#8abccf,#73a2c6,#5d8abd,#4771b2,#2e59a8,#00429d';

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
            count: 'ValueKilos',
          },
        },
      },
      viewport: { longitude: 0, latitude: 20, zoom: 1 },
      settings: { colorScheme: COLOR_SCHEME.split(',') },
    },
  ],
};

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const flowmapCityRef = useRef<FlowmapCity>();
  useEffect(() => {
    if (containerRef.current && !flowmapCityRef.current) {
      const flowmapCity = new FlowmapCity({
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2YmEyZjQxLTQ5ZDUtNDRhOC1hNjljLTRmYTkyMzAyZTQ0OCIsImlhdCI6MTczNDU0MTk5OH0.d3LS6eGSWlQQkSc0_FGOdhQ4jT2O9C19c6eijL2fGaI',
        container: containerRef.current,
        config,
        options: { readOnly: true, showSidebar: true },
      });
      flowmapCityRef.current = flowmapCity;
    }
  }, []);
  return <div ref={containerRef} />;
}

export default App;
