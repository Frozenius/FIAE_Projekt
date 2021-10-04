export interface BaseQstat {
    date: Date;
  }
  
  export interface Qstat extends BaseQstat {
    portal: string;
    country: string;
    total: number;
  }
  
  export interface DetailQstat extends Qstat {
    matchedModels: number;
    companyName: number;
    street: number;
    city: number;
    zip: number;
    countryValid: number;
    commercialDealers: number;
    price: number;
    currency: number;
    registration_date: number;
    mileage: number;
    brand: number;
    make_model: number;
    extraLineInfo: number;
    kw: number;
    ccm: number;
    fuelType: number;
    fuelTypeConventional: number;
    bodyType: number;
    gearboxMatchesOption: number;
    body: number;
    doors: number;
    fuelConsumption: number;
    co2: number;
    colour: number;
    commisionNo: number;
    vin: number;
    min5Options: number;
    min15Options: number;
    max40Options: number;
    withoutDeleteIndikator: number;
    topRegDates: number;
    topRegDatesWithoutNew: number;
    topMileages: number;
    topPrices: number;
    topZips: number;
  }
  export interface TopStat {
    country: string;
    crawlpage: string;
    datum: Date;
    perc: number;
    sumC: number;
    total: number;
    vals: string[];
    valueType: string;
  }
  
  export interface DetailStat {
    id: any;
    acid: any;
    group_id: any;
    first_crawldatetime: any;
    last_crawldatetime: any;
    last_web_address: any;
    price: any;
    currency: any;
    km: any;
    registration_date: any;
    make_model: any;
    vin: any;
    commision_no: any;
    body_type: any;
    color: any;
    ac_color: any;
    engine_power: any;
    engine_transmission: any;
    cylinder_capacity: any;
    enginge_cylinders: any;
    gear_box_type: any;
    engine_gears: any;
    doors: any;
    seats: any;
    fuel_type: any;
    fuel_consumption: any;
    co2: any;
    visual_quality_picture: any;
    visual_quality_film: any;
    toxic_class: any;
    toxic_plaquette: any;
    color_interieur: any;
    warranty_type: any;
    crawled_vendor_id: any;
    company_dealer: any;
    company_name: any;
    street: any;
    city: any;
    zip: any;
    country: any;
    recrawl: any;
    delete_indicator: any;
    delete_info: any;
  }
  