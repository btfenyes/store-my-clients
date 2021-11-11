export interface Client {
  id?: number;
  name: string;
  taxNumber?: string;
  companyRegistrationNumber?: string;
  address?: string;
  phone?: string;
  bankAccount?: string;
  comment?: string;
  companyType?: number;
  CityId?: number;
  CompanyTypeId?: number;
  City?: string;
  CompanyType?: string;
}

export interface CompanyType {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}