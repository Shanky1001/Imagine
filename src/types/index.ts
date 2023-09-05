export interface analytics {
    GA_TRACKING_ID:string
}

export interface dropDown {
    label:string,
    data:any[],
    handleSelect:(e: React.ChangeEvent<HTMLSelectElement>)=>void,
    value:string
}

export interface formInterface {
    name:string,
    prompt:string,
    photo:string,
    size:string
}

export interface card {
    _id:string,
    name:string,
    prompt:string,
    photo:string
}