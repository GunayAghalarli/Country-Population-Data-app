
# **Country Population Visualizer**  

## **Overview**  
This web application visualizes the population data of countries in a given region. It uses the **World Bank public API** to fetch data and display it in an interactive chart. The user can select a country from a dropdown menu to dynamically update the visualized data.  

## **Features**  
- Fetches and displays a list of countries from the **European region**.  
- Displays population data for a selected country in an interactive chart.  
- Responsive and user-friendly interface.  
- Powered by modern tools and frameworks for efficient and fast performance.  

## **Tech Stack**  
- **Framework**: React (with Vite for bundling and development).  
- **Chart Library**: Chart.js for data visualization.  
- **UI Components**: PrimeReact for dropdown and UI components.  
- **Styling**: CSS for styling.  
- **API**: World Bank public API for fetching population data.  

## **API Endpoints**  
The application uses the following API endpoints:  
1. **List of Countries**:  
   - URL: `https://api.worldbank.org/v2/country?format=json&region=EUU`  
   - Provides a list of countries in the European region.  
2. **Population by Country**:  
   - URL: `https://api.worldbank.org/v2/country/{COUNTRY_ID}/indicator/SP.POP.TOTL?format=json`  
   - Replace `{COUNTRY_ID}` with the selected country's code to fetch population data.  

## **Installation and Setup**  
To run the application locally, follow these steps:  

### **Prerequisites**  
- Install [Node.js](https://nodejs.org/) (ensure `npm` is installed).  

### **Steps**  
1. **Clone the repository**:  
   ```bash  
   git clone https://github.com/yourusername/country-population-visualizer.git  
   cd country-population-visualizer  
   ```  
2. **Install dependencies**:  
   ```bash  
   npm install  
   ```  
3. **Run the application**:  
   ```bash  
   npm run dev  
   ```  
4. Open the application in your browser at [http://localhost:3000](http://localhost:3000).  

## **Usage**  
1. Select a country from the dropdown menu.  
2. View the population data visualized as a chart.  
3. Change the selection to update the chart with a new country’s population data.  

## **Project Structure**  
```plaintext  
country-population-visualizer/  
├── src/  
│   ├── components/       # Reusable React components  
│   ├── App.jsx           # Main application component  
│   ├── index.css         # Global styles  
│   └── main.jsx          # Entry point  
├── package.json          # Project dependencies and scripts  
└── vite.config.js        # Vite configuration  
```  

## **Libraries and Tools Used**  
- **Vite**: Development environment for fast builds.  
- **React**: Framework for building user interfaces.  
- **Chart.js**: Visualization library for rendering charts.  
- **PrimeReact**: UI component library for dropdown menus.  

