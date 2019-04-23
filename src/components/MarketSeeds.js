import React, {Component} from 'react';
import {CountryService} from '../service/CountryService';
import {CarService} from '../service/CarService';
import {NodeService} from '../service/NodeService';
import {MultiSelect} from 'primereact/multiselect';
import {Button} from 'primereact/button';
import {Panel} from 'primereact/panel';;

export class MarketSeeds extends Component {

    constructor() {
        super();
        this.state = {
            selectedHandPickedSeeds: [],
            HandPickedOptions: [
                {label: 'Hindu Kush', value: 'hk'},
                {label: 'Afghani', value: 'afg'},
                {label: 'Lashkar Gah', value: 'lkg'},
                {label: 'Mazar i Sharif', value: 'mis'},
                {label: 'Lambs Bread', value: 'lb'},
                {label: 'Kings Bread', value: 'kbr'},
                {label: 'Acapulco Gold', value: 'aca'},
                {label: 'Swazi Gold', value: 'swz'},
                {label: 'Kilimanjaro', value: 'kmj'},
                {label: 'Durban Poison', value: 'dp'},
                {label: 'Malawi', value: 'mal'},
				{label: 'Panama Red', value: 'pam'},
                {label: 'Columbian Gold', value: 'cg'},
				{label: 'Aceh', value: 'ach'},
				{label: 'Thai', value: 'tha'},
				{label: 'Chocoloate Thai', value: 'cht'}
            ],
			selectedPremiumSeeds: [],
			PremiumOptions: [
                {label: 'Hindu Kush', value: 'hk'},
                {label: 'Afghani', value: 'afg'},
                {label: 'Lashkar Gah', value: 'lkg'},
                {label: 'Mazar i Sharif', value: 'mis'},
                {label: 'Lambs Bread', value: 'lb'},
                {label: 'Kings Bread', value: 'kbr'},
                {label: 'Acapulco Gold', value: 'aca'},
                {label: 'Swazi Gold', value: 'swz'},
                {label: 'Kilimanjaro', value: 'kmj'},
                {label: 'Durban Poison', value: 'dp'},
                {label: 'Malawi', value: 'mal'},
				{label: 'Panama Red', value: 'pam'},
                {label: 'Columbian Gold', value: 'cg'},
				{label: 'Aceh', value: 'ach'},
				{label: 'Thai', value: 'tha'},
				{label: 'Chocoloate Thai', value: 'cht'}
            ],
			selectedBasicSeeds: [],
			BasicOptions: [
                {label: 'Hindu Kush', value: 'hk'},
                {label: 'Afghani', value: 'afg'},
                {label: 'Lashkar Gah', value: 'lkg'},
                {label: 'Mazar i Sharif', value: 'mis'},
                {label: 'Lambs Bread', value: 'lb'},
                {label: 'Kings Bread', value: 'kbr'},
                {label: 'Acapulco Gold', value: 'aca'},
                {label: 'Swazi Gold', value: 'swz'},
                {label: 'Kilimanjaro', value: 'kmj'},
                {label: 'Durban Poison', value: 'dp'},
                {label: 'Malawi', value: 'mal'},
				{label: 'Panama Red', value: 'pam'},
                {label: 'Columbian Gold', value: 'cg'},
				{label: 'Aceh', value: 'ach'},
				{label: 'Thai', value: 'tha'},
				{label: 'Chocoloate Thai', value: 'cht'}
            ]
        };

        this.countryService = new CountryService();
        this.carService = new CarService();
        this.nodeService = new NodeService();

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.filterCountry = this.filterCountry.bind(this);
        
        this.dataViewItemTemplate = this.dataViewItemTemplate.bind(this);
        this.orderListTemplate = this.orderListTemplate.bind(this);
    }

    componentDidMount(){
        this.setState({countriesData: this.countryService.getCountries(this)});
        this.carService.getCarsSmall().then(data => this.setState({dataTableValue: data}));
        this.carService.getCarsLarge().then(data => this.setState({dataViewValue: data}));
        this.nodeService.getTreeNodes(this).then(nodes => this.setState({treeData: nodes}));
        this.carService.getCarsSmall().then(data => this.setState({picklistSourceCars: data}));
        this.carService.getCarsSmall().then(data => this.setState({orderlistCars: data}));
    }

    filterCountry(event) {
        const results = this.state.countriesData.filter((country) => {
            return country.name.toLowerCase().startsWith(event.query.toLowerCase());
        });

        this.setState({filteredCountries: results});
    }

    onCheckboxChange(event){
        let selected = [...this.state.checkboxValue];

        if(event.checked)
            selected.push(event.value);
        else
            selected.splice(selected.indexOf(event.value), 1);

        this.setState({checkboxValue: selected});
    }

    orderListTemplate(car){
        if (!car) {
            return;
        }

        return (
            <div className="p-clearfix">
                <img src={`assets/demo/images/car/${car.brand}.png`} alt={car.brand} style={{display:'inline-block',margin:'2px 0 2px 2px', width: '50px'}} />
                <div style={{fontSize:14,float:'right',margin:'15px 5px 0 0'}}>{car.brand} - {car.year} - {car.color}</div>
            </div>
        );
    }

    dataViewItemTemplate(car,layout) {
        if (!car) {
            return;
        }

        let src = "assets/demo/images/car/" + car.brand + ".png";

        if (layout === 'list') {
            return (
                <div className="p-grid" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
                    <div className="p-col-12 p-md-3">
                        <img src={src} alt={car.brand} />
                    </div>
                    <div className="p-col-12 p-md-8 car-details">
                        <div className="p-grid">
                            <div className="p-col-2 p-sm-6">Vin:</div>
                            <div className="p-col-10 p-sm-6">{car.vin}</div>

                            <div className="p-col-2 p-sm-6">Year:</div>
                            <div className="p-col-10 p-sm-6">{car.year}</div>

                            <div className="p-col-2 p-sm-6">Brand:</div>
                            <div className="p-col-10 p-sm-6">{car.brand}</div>

                            <div className="p-col-2 p-sm-6">Color:</div>
                            <div className="p-col-10 p-sm-6">{car.color}</div>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-1 search-icon" style={{marginTop:'40px'}}>
                        <Button icon="pi pi-search"></Button>
                    </div>
                </div>
            );
        }

        if (layout === 'grid') {
            return (
                <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                    <Panel header={car.vin} style={{ textAlign: 'center' }}>
                        <img src={`assets/demo/images/car/${car.brand}.png`} alt={car.brand} />
                        <div className="car-detail">{car.year} - {car.color}</div>
                        <i className="pi pi-search" style={{ cursor: 'pointer' }}></i>
                    </Panel>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="p-fluid bgimg">
                <div className="p-grid">
				<div className="p-col-8">
					<div className="card-blank card-w-title bgWeedimg">
					<h1><font color="white">Welcome to the Hashkings Dispensary</font></h1>
					<br/>
					<h4>Hand-Picked Seeds</h4>
					<p><font color="white">These are the best seeds in our seed bank and come with 2250 XP. For 3 Steem you will be able to purchase one of these top shelf seeds.</font></p>
					<h4>Premium Seeds</h4>
					<p><font color="white">Looking to grow get your feet wet and find new traits with these 750 XP seeds for 1.5 Steem</font></p>
					<h4>Basic Seeds</h4>
					<p><font color="white">These seeds come with 1 XP and cost .75 Steem. These seeds are for the casual gardner looking to earn only passive income from their crops</font></p>
					</div>
					</div>
					<div className="p-col-4">
					</div>
					<div className="p-col-3">
				</div>
                    <div className="p-col-6">
                        <div className="card-blank card-w-title">
                            <h1><font color="blue">Hand-Picked Seeds</font></h1>
							<h2><b>3 Steem</b></h2>
							<br/>
                            <div className="p-grid">
								<div className="p-col-12 p-md-2">
                                    <label htmlFor="multiselect"></label>
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <MultiSelect id="multiselect" placeholder="Choose" value={this.state.selectedBasicSeeds} options={this.state.BasicOptions} onChange={event => this.setState({selectedBasicSeeds: event.value})} />
                                </div>
								<div className="p-col-12 p-md-4">
                                    <Button label="Lease Gardens" icon="pi pi-external-link" onClick={() => this.setState({dialogVisible:true})} />
                                </div>
							</div>
                        </div>
                    </div>
					<div className="p-col-3">
					</div>
					<div className="p-col-3">
					</div>
                    <div className="p-col-6">
                        <div className="card-blank card-w-title">
                            <h1><font color="green">Premium Seeds</font></h1>
							<h2><b>1.5 Steem</b></h2>
							<br/>
                            <div className="p-grid">
								<div className="p-col-12 p-md-2">
                                    <label htmlFor="multiselect"></label>
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <MultiSelect id="multiselect" placeholder="Choose" value={this.state.selectedPremiumSeeds} options={this.state.PremiumOptions} onChange={event => this.setState({selectedPremiumSeeds: event.value})} />
                                </div>
								<div className="p-col-12 p-md-4">
                                    <Button label="Lease Gardens" icon="pi pi-external-link" onClick={() => this.setState({dialogVisible:true})} />
                                </div>
							</div>
                        </div>
                    </div>
					<div className="p-col-3">
					</div>
					<div className="p-col-3">
					</div>
                    <div className="p-col-6">
                        <div className="card-blank card-w-title">
                            <h1>Basic Seeds</h1>
							<h2><b>.75 Steem</b></h2>
							<br/>
                            <div className="p-grid">
								<div className="p-col-12 p-md-2">
                                    <label htmlFor="multiselect"></label>
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <MultiSelect id="multiselect" placeholder="Choose" value={this.state.selectedHandPickedSeeds} options={this.state.HandPickedOptions} onChange={event => this.setState({selectedHandPickedSeeds: event.value})} />
                                </div>
								<div className="p-col-12 p-md-4">
                                    <Button label="Lease Gardens" icon="pi pi-external-link" onClick={() => this.setState({dialogVisible:true})} />
                                </div>
							</div>
                        </div>
                    </div>
					<div className="p-col-3">
					</div>
                </div>
            </div>
        );
    }
}