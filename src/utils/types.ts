import { IconType } from "react-icons";
export interface ICoordinates {
   longitude: string | number,
   latitude: string | number
}
export interface ILocation {
   name: string,
   value: number,
   description?: string,
   category?: string,
   coordinates: ICoordinates
}
export interface HeaderConfig {
   'Content-type': string,
   authorization?: string
}

export interface ILogin {
   email: string,
   password: string
}
export class Group {
   id!: number | null;
   Mkoa!: string;
   District!: string;
   Kata!: string;
   Kijiji!: string;
   "Namba ya barabara"!: string;
   "Urefu wa barabara"!: number;
   "Group name"!: string;
   "Number of group members"!: number;
   F!: number;
   M!: number;
   Discount!: string;
   Dis!: number;
   "Reg type1"!: string;
   "Reg type2"!: string;
   "Reg type3"!: string;
   Latitude!: number;
   Longitude!: number;

   constructor(data: Group) {
      this.id = data.id ? data.id : null;
      this.Mkoa = data.Mkoa;
      this.District = data.District;
      this.Kata = data.Kata;
      this.Kijiji = data.Kijiji;
      this["Namba ya barabara"] = data["Namba ya barabara"];
      this["Urefu wa barabara"] = data["Urefu wa barabara"];
      this["Group name"] = data["Group name"];
      this["Number of group members"] = data["Number of group members"];
      this.F = data.F;
      this.M = data.M;
      this.Discount = data.Discount;
      this.Dis = data.Dis;
      this["Reg type1"] = data["Reg type1"];
      this["Reg type2"] = data["Reg type2"];
      this["Reg type3"] = data["Reg type3"]
      this.Latitude = data.Latitude;
      this.Longitude = data.Longitude;
   }

   toGroupType() {
      let group: GroupType = {
         name: this["Group name"],
         latitude: this.Latitude,
         longitude: this.Longitude,
         ward: this.Kata,
         village: this.Kijiji,
         region: this.Mkoa,
         district: this.District,
         disabledCount: this.Dis,
         femalesCount: this.F,
         malesCount: this.M,
         roadCode: this["Namba ya barabara"],
         roadLength: this["Urefu wa barabara"],
         membersCount: this["Number of group members"]
      }
      return group
   }

}
export type GroupType = {
   id?: number,
   name: string;
   region: string;
   district: string;
   ward: string;
   village: string;
   registrationDate?: Date;
   registrationNumber?: string;
   registrationType?: string;
   registrationStatus?: string;
   chairmanName?: string;
   chairmanPhone?: string;
   secretaryName?: string;
   secretaryPhone?: string;
   treasurerName?: string;
   treasurerPhone?: string;
   membersCount?: number;
   femalesCount?: number;
   malesCount?: number;
   disabledCount?: number;
   latitude?: number;
   longitude?: number;
   roadCode?: string;
   roadLength?: number;
   members?: Member[];
}
export type Member = {
   id?: string,
   firstName: string;
   lastName: string;
   phoneNumber?: string;
   age?: number;
   region?: string;
   district?: string;
   ward?: string;
   group: GroupType;
   role?: string;
   gender?: string;
   address?: string;
}
export interface ISession {
   email?: string;
   accessToken: string
}
export interface IUserData {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role: number;
    createdAt?: Date;
    updatedAt?: Date;

}

export interface IMenuItem {
   id: number,
   text: string,
   icon: string | IconType,
   clicked?: boolean
}

export interface IPaginationOptions {
   page?: number,
   take?: number,
   paginate?: boolean
}

export interface PapaParseResult{
   data: any[],
   errors: any[],
   meta:any
}

export interface ISummaryCard {
   title: string,
   value: string | number,
   name?: string,
   id?: string | number,
   bg?: string,
   color?: string
}

export interface IDistrictCountItem {
   district: string,
   district_count: number
}
export interface IRegionCountItem {
   region: string,
   region_count: number
}
export interface IReportSummary {
   totalGroups: number,
   males: number,
   females: number,
   disabled: number,
   abled: number,
   totalMembers: number,
   femaleMaleRatio: number,
   disabledRatio: number,
   groupsByDistrict: IDistrictCountItem[],
   membersByDistrict: IDistrictCountItem[],
   groupsByRegion: IRegionCountItem[],
   membersByRegion: IDistrictCountItem[],
   regions: string[],
   districts: string[],
   groupsWithRoadCode: number
}

export enum RoleEnum {
   USER = 0,
   ADMIN = 1
}

export enum RoleNameEnum {
   USER = 'User',
   ADMIN = 'Admin'
}