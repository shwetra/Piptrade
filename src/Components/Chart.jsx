import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Chart = () => {
    const svgRef = useRef();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState(data);
    const [selectedFilters, setSelectedFilters] = useState({
        endYear: '',
        topic: '',
        sector: '',
        region: '',
        pest: '',
        source: '',
        swot: '',
        country: '',
        city: ''
    });

    const fetchData = async () => {
        try {
            const response = await fetch('https://piptrade.onrender.com/alldata');
            const jsonData = await response.json();
            setData(jsonData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {

        // Filter data based on selected filters
        let filtered = data.filter(d => {
            return (
                (selectedFilters.endYear === '' || d.end_year === parseInt(selectedFilters.endYear)) &&
                (selectedFilters.topic === '' || d.topic === selectedFilters.topic) &&
                (selectedFilters.sector === '' || d.sector === selectedFilters.sector) &&
                (selectedFilters.region === '' || d.region === selectedFilters.region) &&
                (selectedFilters.pest === '' || d.pestle === selectedFilters.pest) &&
                (selectedFilters.source === '' || d.source === selectedFilters.source) &&
                (selectedFilters.swot === '' || d.impact === selectedFilters.swot) &&
                (selectedFilters.country === '' || d.country === selectedFilters.country) &&
                (selectedFilters.city === '' || d.city === selectedFilters.city)
            );
        });

        setFilteredData(filtered);
    }, [data, selectedFilters]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = 1100;
        const height = 500;
        const margin = { top: 20, right: 30, bottom: 40, left: 50 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .domain(filteredData.map(d => d.topic))
            .range([0, innerWidth])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(filteredData, d => d.intensity)])
            .nice()
            .range([innerHeight, 0]);

        const xAxis = d3.axisBottom(x);

        const yAxis = d3.axisLeft(y);

        svg.selectAll('*').remove();

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        g.append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-45)');

        g.append('g')
            .attr('class', 'axis axis-y')
            .call(yAxis)
            .append('text')
            .attr('fill', '#000')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Intensity');

        g.selectAll('.bar')
            .data(filteredData)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.topic))
            .attr('y', d => y(d.intensity))
            .attr('width', x.bandwidth())
            .attr('height', d => innerHeight - y(d.intensity));
    }, [filteredData]);

    // Function to handle filter selection
    const handleFilterChange = (filter, value) => {
        setSelectedFilters(prevState => ({
            ...prevState,
            [filter]: value
        }));
    };

    return (
        <div id="main">
            {/* ----------------------option tags for filter ---------------------- */}
            <div id="filters">
                <div id="logo"><img src="https://piptrade.org/logo.png" alt="" height={"200px"} /></div>
                <label>
                    <select value={selectedFilters.topic} onChange={(e) => handleFilterChange('topic', e.target.value)}>
                        <option value="">Select Topic</option>
                        <option value="gas">Gas</option>
                        <option value="oil">Oil</option>
                        <option value="consumption">Consumption</option>
                        <option value="market">Market</option>
                        <option value="gdp">GDP</option>
                        <option value="war">War</option>
                        <option value="production">Production</option>
                        <option value="export">Export</option>
                        <option value="battery">Battery</option>
                        <option value="biofuel">Biofuel</option>
                        <option value="policy">Policy</option>
                        <option value="economy">Economy</option>
                        <option value="strategy">Strategy</option>
                        <option value="robot">Robot</option>
                        <option value="growth">Growth</option>
                        <option value="economic">Economic</option>
                        <option value="energy">Energy</option>
                        <option value="administration">Administration</option>
                        <option value="unemployment">Unemployment</option>
                        <option value="trade">Trade</option>
                        <option value="demand">Demand</option>
                        <option value="economic Growth">Economic Growth</option>
                        <option value="industry">Industry</option>
                        <option value="capital">Capital</option>
                        <option value="worker">Worker</option>
                        <option value="tension">Tension</option>
                        <option value="terrorism">Terrorism</option>
                        <option value="climate">Climate</option>
                        <option value="power">Power</option>
                        <option value="crisis">Crisis</option>
                        <option value="ice">Ice</option>
                        <option value="population">Population</option>
                    </select>
                </label>



                <label>
                    <select value={selectedFilters.endYear} onChange={(e) => handleFilterChange('endYear', e.target.value)}>
                        <option value="">Select Date</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2030">2030</option>
                        <option value="2035">2035</option>
                        <option value="2040">2040</option>
                        <option value="2041">2041</option>
                        <option value="2046">2046</option>
                        <option value="2050">2050</option>
                        <option value="2126">2126</option>
                        <option value="2200">2200</option>

                    </select>
                </label>



                <label>
                    <select value={selectedFilters.sector} onChange={(e) => handleFilterChange('sector', e.target.value)}>
                        <option value="">Select Sector</option>
                        <option value="Energy">Energy</option>
                        <option value="Environment">Environment</option>
                        <option value="Government">Government</option>
                        <option value="Aerospace & defence">Aerospace & defence</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Retail">Retail</option>
                        <option value="Financial services">Financial services</option>
                        <option value="Support services">Support services</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Food & agriculture">Food & agriculture</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Tourism & hospitality">Tourism & hospitality</option>
                        <option value="Construction">Construction</option>

                    </select>
                </label>

                <label>
                    <select value={selectedFilters.region} onChange={(e) => handleFilterChange('region', e.target.value)}>
                        <option value="">Select Region</option>
                        <option value="Northern America">Northern America</option>
                        <option value="Central America">Central America</option>
                        <option value="Western Africa">Western Africa</option>
                        <option value="Western Asia">Western Asia</option>
                        <option value="Eastern Europe">Eastern Europe</option>
                        <option value="Northern Africa">Northern Africa</option>
                        <option value="Southern Africa">Southern Africa</option>
                        <option value="Southern Asia">Southern Asia</option>
                        <option value="Eastern Asia">Eastern Asia</option>
                        <option value="Central Africa">Central Africa</option>
                        <option value="Southern Europe">Southern Europe</option>
                        <option value="Northern Europe">Northern Europe</option>
                        <option value="Western Europe">Western Europe</option>
                        <option value="Oceania">Oceania</option>
                        <option value="South America">South America</option>
                        <option value="South-Eastern Asia">South-Eastern Asia</option>
                        <option value="Eastern Africa">Eastern Africa</option>
                        <option value="Asia">Asia</option>
                        <option value="Northern Europe">Northern Europe</option>
                        <option value="Eastern Europe">Eastern Europe</option>
                        <option value="Europe">Europe</option>
                        <option value="Northern Africa">Northern Africa</option>
                        <option value="Western Europe">Western Europe</option>
                        <option value="South America">South America</option>
                        <option value="Western Africa">Western Africa</option>
                        <option value="South-Eastern Asia">South-Eastern Asia</option>
                        <option value="Eastern Asia">Eastern Asia</option>
                        <option value="Southern Asia">Southern Asia</option>
                        <option value="Northern Europe">Northern Europe</option>
                        <option value="Northern America">Northern America</option>
                        <option value="Eastern Africa">Eastern Africa</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Africa">Africa</option>

                    </select>
                </label>

                <label>
                    <select value={selectedFilters.pest} onChange={(e) => handleFilterChange('pest', e.target.value)}>
                        <option value="">Select PEST</option>
                        <option value="Industries">Industries</option>
                        <option value="Environmental">Environmental</option>
                        <option value="Economic">Economic</option>
                        <option value="Political">Political</option>
                        <option value="Organization">Organization</option>
                        <option value="Technological">Technological</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Social">Social</option>
                        <option value="Lifestyles">Lifestyles</option>

                    </select>
                </label>
                <label>
                    <select value={selectedFilters.country} onChange={(e) => handleFilterChange('country', e.target.value)}>
                        <option value="">Select Country</option>
                        <option value="United States of America">United States of America</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Russia">Russia</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Angola">Angola</option>
                        <option value="Egypt">Egypt</option>
                        <option value="South Africa">South Africa</option>
                        <option value="India">India</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="China">China</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Niger">Niger</option>
                        <option value="Libya">Libya</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Mali">Mali</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Iran">Iran</option>
                        <option value="South Sudan">South Sudan</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Germany">Germany</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Canada">Canada</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Japan">Japan</option>
                        <option value="Austria">Austria</option>
                        <option value="Spain">Spain</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Australia">Australia</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Japan">Japan</option>
                        <option value="Australia">Australia</option>
                        <option value="Australia">Australia</option>
                        <option value="Australia">Australia</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Australia">Australia</option>
                        <option value="Japan">Japan</option>
                        <option value="Iran">Iran</option>
                        <option value="India">India</option>
                        <option value="Niger">Niger</option>
                        <option value="Iraq">Iraq</option>
                    </select>
                </label>

                <label>
                    <select value={selectedFilters.source} onChange={(e) => handleFilterChange('source', e.target.value)}>
                        <option value="">Select Source</option>
                        <option value="EIA">EIA</option>
                        <option value="sustainablebrands.com">sustainablebrands.com</option>
                        <option value="SBWire">SBWire</option>
                        <option value="CleanTechnica">CleanTechnica</option>
                        <option value="TRAC News">TRAC News</option>
                        <option value="Vanguard News">Vanguard News</option>
                        <option value="Avi Melamed">Avi Melamed</option>
                        <option value="WSJ">WSJ</option>
                        <option value="Abq">Abq</option>
                        <option value="Reuters">Reuters</option>
                        <option value="Star Tribune">Star Tribune</option>
                        <option value="EV Obsession">EV Obsession</option>
                        <option value="creamermedia">creamermedia</option>
                        <option value="Resilience">Resilience</option>
                        <option value="TheNews.NG">TheNews.NG</option>
                        <option value="FashionNetwork.com">FashionNetwork.com</option>
                        <option value="Bloomberg Business">Bloomberg Business</option>
                        <option value="Yes Bank">Yes Bank</option>
                        <option value="EGYPS">EGYPS</option>
                        <option value="marketrealist">marketrealist</option>
                        <option value="PDQFX news">PDQFX news</option>
                        <option value="therobotreport">therobotreport</option>
                        <option value="nextbigfuture">nextbigfuture</option>
                        <option value="World Bank">World Bank</option>
                        <option value="Zero Hedge">Zero Hedge</option>
                        <option value="Rigzone">Rigzone</option>
                        <option value="International Business Times">International Business Times</option>
                        <option value="DOE EIA 2013 Energy Conference">DOE EIA 2013 Energy Conference</option>
                        <option value="AllAfrica">AllAfrica</option>
                        <option value="Energy.gov Website">Energy.gov Website</option>
                        <option value="AMERICAN COUNCIL ON SCIENCE AND HEALTH">AMERICAN COUNCIL ON SCIENCE AND HEALTH</option>
                        <option value="The Jakarta Post">The Jakarta Post</option>
                        <option value="Wharton">Wharton</option>
                        <option value="African Arguments">African Arguments</option>
                        <option value="Business Insider">Business Insider</option>
                        <option value="Convenience Store Decisions">Convenience Store Decisions</option>
                        <option value="The Next Web">The Next Web</option>
                        <option value="Cii Radio">Cii Radio</option>
                        <option value="Global Money Trends">Global Money Trends</option>
                        <option value="Guardian Sustainable Business">Guardian Sustainable Business</option>
                        <option value="OklahomaMinerals.com">OklahomaMinerals.com</option>
                        <option value="4th Annual Congress and Expo on Biofuels and Bioenergy April 27-28 2017 Dubai UAE">4th Annual Congress and Expo on Biofuels and Bioenergy April 27-28 2017 Dubai UAE</option>
                        <option value="FX Empire">FX Empire</option>
                        <option value="Nexus Conference">Nexus Conference</option>
                        <option value="Fews Net">Fews Net</option>
                        <option value="Sputnik News">Sputnik News</option>
                        <option value="platts">platts</option>
                        <option value="CBO">CBO</option>
                        <option value="The Chirographer">The Chirographer</option>
                        <option value="THE LEAGUE OF WOMEN VOTERS® OF THE FAIRFAX AREA">THE LEAGUE OF WOMEN VOTERS® OF THE FAIRFAX AREA</option>
                        <option value="Yahoo Finance Canada">Yahoo Finance Canada</option>
                        <option value="Gii Research">Gii Research</option>
                        <option value="South Sudan News Agency">South Sudan News Agency</option>
                        <option value="Climate Change News">Climate Change News</option>
                        <option value="the star online">the star online</option>
                        <option value="khorreports-palmoil">khorreports-palmoil</option>
                        <option value="Canadian Biomass">Canadian Biomass</option>
                        <option value="Informed Choice Chartered Financial Planners in Cranleigh">Informed Choice Chartered Financial Planners in Cranleigh</option>
                        <option value="Guarini Center">Guarini Center</option>
                        <option value="OMFIF">OMFIF</option>
                        <option value="South World">South World</option>
                        <option value="World Energy News">World Energy News</option>
                        <option value="Slinking Toward Retirement">Slinking Toward Retirement</option>
                        <option value="unian">unian</option>
                        <option value="Scientific American">Scientific American</option>
                        <option value="Time">Time</option>
                        <option value="Transport Environment">Transport Environment</option>
                        <option value="Triple Pundit">Triple Pundit</option>
                        <option value="Transport Evolved">Transport Evolved</option>
                        <option value="Fox Business">Fox Business</option>
                        <option value="The Independent">The Independent</option>
                        <option value="Biofuels Digest">Biofuels Digest</option>
                        <option value="IRENA newsroom">IRENA newsroom</option>
                        <option value="Nation of Change">Nation of Change</option>
                        <option value="Middle East Eye">Middle East Eye</option>
                        <option value="IEA">IEA</option>
                        <option value="Gas 2">Gas 2</option>
                        <option value="Peak Prosperity">Peak Prosperity</option>
                        <option value="Business Wire">Business Wire</option>
                        <option value="RiskMap 2017">RiskMap 2017</option>
                        <option value="MRC">MRC</option>
                        <option value="Insurance Journal">Insurance Journal</option>
                        <option value="Wired UK">Wired UK</option>
                        <option value="Technavio">Technavio</option>
                        <option value="News">News</option>
                        <option value="Media Center">Media Center</option>
                        <option value="EY">EY</option>
                        <option value="Tactical Investor">Tactical Investor</option>
                        <option value="Seeking Alpha">Seeking Alpha</option>
                        <option value="iMFdirect - The IMF Blog">iMFdirect - The IMF Blog</option>
                        <option value="oilprice.com">oilprice.com</option>
                        <option value="Eurasia Group">Eurasia Group</option>
                        <option value="Resilience">Resilience</option>
                        <option value="NY Times">NY Times</option>
                        <option value="Imeche">Imeche</option>
                        <option value="University of Chicago">University of Chicago</option>
                        <option value="Adam Curry">Adam Curry</option>
                        <option value="JD Supra">JD Supra</option>
                        <option value="UK Government">UK Government</option>
                        <option value="Vox">Vox</option>
                        <option value="South China Morning Post">South China Morning Post</option>
                        <option value="OEM/Lube News">OEM/Lube News</option>
                        <option value="PR Newswire">PR Newswire</option>
                        <option value="The Economist">The Economist</option>
                        <option value="Phys Org">Phys Org</option>
                        <option value="djsresearch">djsresearch</option>
                        <option value="nbk">nbk</option>
                        <option value="Edge and Odds">Edge and Odds</option>
                        <option value="maltawinds.com">maltawinds.com</option>
                    </select>
                </label>




            </div>


            {/* --------------------Chart ---------------------------*/}
            <div id="chart">
                <svg ref={svgRef} width={1200} height={600}></svg>
            </div>
        </div>
    );
};

export default Chart;