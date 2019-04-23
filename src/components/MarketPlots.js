import React, {Component} from 'react';
import {CountryService} from '../service/CountryService';
import {CarService} from '../service/CarService';
import {NodeService} from '../service/NodeService';
import {Checkbox} from 'primereact/checkbox';
import {ListBox} from 'primereact/listbox';
import {Button} from 'primereact/button';
import {Panel} from 'primereact/panel';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

export class MarketPlots extends Component {

    constructor() {
        super();
        this.state = {
            date: null,
            country: null,
            filteredCountries: null,
            countriesData: [],
            dropdownCity: null,
			selectedNodeKey: null,
            cities: [
                {label: 'Select City', value: null},
                {label: 'New York', value: 'New York'},
                {label: 'Rome', value: 'Rome'},
                {label: 'London', value: 'London'},
                {label: 'Istanbul', value: 'Istanbul'},
                {label: 'Paris', value: 'Paris'},
            ],
            spinnerValue: null,
            checkboxValue: [],
            radioValue: null,
            sliderValue: null,
            toggleButtonValue: null,
            dialogVisible: false,
            dataTableValue: [],
            dataTableSelection: null,
            dataViewValue: [],
            treeData: [],
            picklistSourceCars: [],
            picklistTargetCars: [],
            orderlistCars: [],
            layout: 'list',
            selectedCars: [],
            carOptions: [
                {label: 'Audi', value: 'Audi'},
                {label: 'BMW', value: 'BMW'},
                {label: 'Fiat', value: 'Fiat'},
                {label: 'Honda', value: 'Honda'},
                {label: 'Jaguar', value: 'Jaguar'},
                {label: 'Mercedes', value: 'Mercedes'},
                {label: 'Renault', value: 'Renault'},
                {label: 'VW', value: 'VW'},
                {label: 'Volvo', value: 'Volvo'}
            ],
            listBoxCity: null,
            listBoxDelegations: [
                {label: '1 Garden', value: 'Madrid'},
                {label: '2 Gardens', value: 'Geneva'},
                {label: '3 Gardens', value: 'Los Angeles'},
                {label: '5 Gardens', value: 'Monaco'},
                {label: '10 Gardens', value: 'Berlin'}
            ],
            selectedType: null,
            types: [
                {label: 'Apartment', value: 'Apartment'},
                {label: 'House', value: 'House'},
                {label: 'Studio', value: 'Studio'}
            ],    
            splitButtonItems: [
                {label: 'Update', icon: 'pi pi-refresh'},
                {label: 'Delete', icon: 'pi pi-times'},
                {label: 'Home', icon: 'pi pi-home', url: 'http://www.primefaces.org/primereact'}
            ],
            menuItems: [
                {
                    label: 'Options',
                    items: [{label: 'New', icon: 'pi pi-fw pi-plus',command:() => window.location.hash="/fileupload"},
                            {label: 'Delete', icon: 'pi pi-fw pi-trash', url: 'http://primetek.com.tr'}]
                }, 
                {
                    label: 'Account',
                    items: [{label: 'Options', icon: 'pi pi-fw pi-cog',command:() => window.location.hash="/"},
                            {label: 'Sign Out', icon: 'pi pi-fw pi-power-off'} ]
                }
            ],
            panelMenuItems: [
                {
                    label:'Documents',
                    icon:'pi pi-fw pi-file',
                    items:[
                       {
                          label:'New',
                          icon:'pi pi-fw pi-plus',
                          items:[
                             {
                                label:'Bookmark',
                                icon:'pi pi-fw pi-bookmark'
                             },
                             {
                                label:'Video',
                                icon:'pi pi-fw pi-video'
                             },
              
                          ]
                       },
                       {
                          label:'Delete',
                          icon:'pi pi-fw pi-trash'
                       },
                       {
                          separator:true
                       },
                       {
                          label:'Export',
                          icon:'pi pi-fw pi-external-link'
                       }
                    ]
                 },
                 {
                    label:'Manage',
                    icon:'pi pi-fw pi-pencil',
                    items:[
                       {
                          label:'Left',
                          icon:'pi pi-fw pi-align-left'
                       },
                       {
                          label:'Right',
                          icon:'pi pi-fw pi-align-right'
                       },
                       {
                          label:'Center',
                          icon:'pi pi-fw pi-align-center'
                       },
                       {
                          label:'Justify',
                          icon:'pi pi-fw pi-align-justify'
                       },
              
                    ]
                 },
                 {
                    label:'Accounts',
                    icon:'pi pi-fw pi-user',
                    items:[
                       {
                          label:'New',
                          icon:'pi pi-fw pi-user-plus',
              
                       },
                       {
                          label:'Delete',
                          icon:'pi pi-fw pi-user-minus',
              
                       },
                       {
                          label:'Search',
                          icon:'pi pi-fw pi-users',
                          items:[
                             {
                                label:'Filter',
                                icon:'pi pi-fw pi-filter',
                                items:[
                                   {
                                      label:'Print',
                                      icon:'pi pi-fw pi-print'
                                   }
                                ]
                             },
                             {
                                icon:'pi pi-fw pi-bars',
                                label:'List'
                             }
                          ]
                       }
                    ]
                 },
                 {
                    label:'Calendar',
                    icon:'pi pi-fw pi-calendar',
                    items:[
                       {
                          label:'Edit',
                          icon:'pi pi-fw pi-pencil',
                          items:[
                             {
                                label:'Save',
                                icon:'pi pi-fw pi-calendar-plus'
                             },
                             {
                                label:'Delete',
                                icon:'pi pi-fw pi-calendar-minus'
                             }
                          ]
                       },
                       {
                          label:'Archieve',
                          icon:'pi pi-fw pi-calendar-times',
                          items:[
                             {
                                label:'Remove',
                                icon:'pi pi-fw pi-calendar-minus'
                             }
                          ]
                       }
                    ]
                 }
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
      const images = [
      {
        original: 'https://i.imgur.com/F3G7OJ1.png',
        thumbnail: 'https://i.imgur.com/F3G7OJ1l.png',
      },
      {
        original: 'https://i.imgur.com/mEQ9DuD.png',
        thumbnail: 'https://i.imgur.com/mEQ9DuDl.png'
      },
      {
        original: 'https://i.imgur.com/sp1WVnQ.png',
        thumbnail: 'https://i.imgur.com/sp1WVnQl.png'
      },
	  {
        original: 'https://i.imgur.com/HFcvuGs.png',
        thumbnail: 'https://i.imgur.com/HFcvuGst.png'
      },
	  {
        original: 'https://i.imgur.com/46VcHyk.png',
        thumbnail: 'https://i.imgur.com/46VcHykh.png'
      },
	  {
        original: 'https://i.imgur.com/IomdkMf.png',
        thumbnail: 'https://i.imgur.com/IomdkMfl.png'
      },
    ]
        return (
            <div className="p-fluid">
                <div className="p-grid">
                    <div className="p-col-12">
						<div className="card card-w-title">
							<center><ImageGallery items={images} /></center>
						</div>
                        <div className="card-blank card-w-title">
                            <h1>Welcome to Garden Sales</h1>
                            <div className="p-grid">
							  <h4><b><font color="green">Below you will find our Avaialable Plots. In order to Lease a garden please choose how many Gardens you would like then choose your favorite regions.</font></b></h4>
                               <div className="p-col-12 p-md-2">
                                    Gardens
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <div className="p-grid">
                                        <div className="p-col-12">
                                            <Checkbox value="Afghanistan" inputId="cb1" onChange={this.onCheckboxChange} checked={this.state.checkboxValue.indexOf('Afghanistan') > -1} />
                                            <label htmlFor="cb1" className="p-checkbox-label">Afghanistan</label>
                                        </div>
                                        <div className="p-col-12">
                                            <Checkbox value="Africa" inputId="cb2" onChange={this.onCheckboxChange} checked={this.state.checkboxValue.indexOf('Africa') > -1} />
                                            <label htmlFor="cb2" className="p-checkbox-label">Africa</label>
                                        </div>
										 <div className="p-col-12">
                                            <Checkbox value="Asia" inputId="cb2" onChange={this.onCheckboxChange} checked={this.state.checkboxValue.indexOf('Asia') > -1} />
                                            <label htmlFor="cb2" className="p-checkbox-label">Asia</label>
                                        </div>
                                        <div className="p-col-12">
                                            <Checkbox value="Central America" inputId="cb3" onChange={this.onCheckboxChange} checked={this.state.checkboxValue.indexOf('Central America') > -1} />
                                            <label htmlFor="cb3" className="p-checkbox-label">Central America</label>
                                        </div>
										<div className="p-col-12">
                                            <Checkbox value="Jamaica" inputId="cb3" onChange={this.onCheckboxChange} checked={this.state.checkboxValue.indexOf('Jamaica') > -1} />
                                            <label htmlFor="cb3" className="p-checkbox-label">Jamaica</label>
                                        </div>
										<div className="p-col-12">
                                            <Checkbox value="Mexico" inputId="cb3" onChange={this.onCheckboxChange} checked={this.state.checkboxValue.indexOf('Mexico') > -1} />
                                            <label htmlFor="cb3" className="p-checkbox-label">Mexico</label>
                                        </div>
                                    </div>
                                </div>
								<div className="p-col-12 p-md-4">
                                    <Button label="Lease Gardens" icon="pi pi-external-link" onClick={() => this.setState({dialogVisible:true})} />
                                </div>
								<div className="p-col-12">
								</div>                        
                                <div className="p-col-12 p-md-2">
                                    <label htmlFor="listbox">How many Garden Plots would you like?</label>
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <ListBox value={this.state.listBoxCity} options={this.state.listBoxDelegations} onChange={event => this.setState({listBoxCity: event.value})} filter={true} />
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <Button label="Delegate" icon="pi pi-external-link" onClick={() => this.setState({dialogVisible:true})} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}