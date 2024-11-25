import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import PropTypes from 'prop-types';

export default function Chart(props) {
  const [chartData, setChartData] = useState(null);
 
  useEffect(() => {
    // if no countries selected, chart will be blank
    if (props.selectedCountries.length === 0) {
      setChartData(null); // Clear chart if no countries selected
      return;
    }
// to map through country codes to include the API
    const countryCodes = props.selectedCountries.map(country => country.code);

    // request World Bank API to fetch population data
    const fetchPopulation = async () => {
        const populationPromises = countryCodes.map((countryCode) => {
  
      
          return fetch(`https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json`)
            .then((response) => response.json()) // turn the data into a JavaScript object 
            .then((data) => {
        
              if (Array.isArray(data) && data.length > 1 && Array.isArray(data[1])) {
                const populationData = data[1];  // Population data for the country
      
                // create a new object with two properties: year and population
                const countryData = populationData.map((item) => ({
                  year: item.date, 
                  population: item.value || 0, 
                }));
      
      
                return {
                  label: countryCode,
                  data: countryData.map((item) => item.population),
                  borderColor: `hsl(${Math.random() * 360}, 100%, 50%)`, // Random color for each line
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  fill: false,
                  tension: 0.1, 
                  countryData, 
                };
              } else {
                console.warn(`No data for country ${countryCode}`);
                return { label: countryCode, data: [], borderColor: 'black' };
              }
            });
        });
      // the data is stored in results
        const results = await Promise.all(populationPromises);
      
        // Collect all unique years from all countries' countryData
        const allYears = results
        //Flattens the countryData arrays from all countries into one single array of years
          .flatMap((result) => result.countryData.map((item) => item.year))
          .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
      
        if (allYears.length > 0) {
          // Create the chart data using the unique years for X-axis and matching population data for each country
          setChartData({
            labels: allYears.reverse(), // Reverse the years for X-axis , ensuring to display from past to present
            datasets: results.map((result) => {
              const reversedData = allYears.map((year) => {
                // Find the population data for the given year for each country
                const dataForYear = result.countryData.find((item) => item.year === year);
                return dataForYear ? dataForYear.population : 0; // Use 0 if no data for that year
              }).reverse(); // Reverse the population data to match the reversed years
          
              return {
                label: result.label,
                data: reversedData,
                borderColor: result.borderColor,
                backgroundColor: result.backgroundColor,
                fill: result.fill,
                tension: result.tension,
              };
            }),
          });
          
        } else {
          console.warn('No valid data to render on the chart');
          setChartData(null);
        }
      };
      
// retrieve population data and set up the chartData object 
    fetchPopulation();
  }, [props.selectedCountries]);

  if (!chartData) {
    return <div> ..Select one or several countries to load the chart...</div>;
  }


  return (
    <div className='chart--style'>
      <h2>Yearly Population Line Chart</h2>
      <Line 
        data={chartData} 
        options={{
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Year', 
              },
              ticks: {
                autoSkip: true, // Skips labels if there are too many
                maxRotation: 45,
                minRotation: 0,  
              },
            },
            y: {
              title: {
                display: true,
                text: 'Population',
              },
              ticks: {
                callback: function(value) {
                    return (value / 1_000_000).toFixed(1) + ' mln'; // display population in mln
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

Chart.propTypes = {
  selectedCountries: PropTypes.array.isRequired,
};
