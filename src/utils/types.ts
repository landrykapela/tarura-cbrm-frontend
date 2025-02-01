import { NONAME } from "dns";
import { IconType } from "react-icons";
import { MdApproval, MdApps, MdAssessment, MdAssignment, MdAssignmentTurnedIn, MdCheck, MdCurtainsClosed, MdDangerous, MdDeleteSweep, MdDirectionsCar, MdExitToApp, MdNavigation, MdPeople, MdSettings, MdTimer } from "react-icons/md";

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
   id!: number|null;
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

   constructor(data:Group){
   this.id = data.id ? data.id : null;
   this.Mkoa=data.Mkoa;
   this.District = data.District;
   this.Kata=data.Kata;
   this.Kijiji=data.Kijiji;
   this["Namba ya barabara"]= data["Namba ya barabara"];
   this["Urefu wa barabara"]= data["Urefu wa barabara"];
   this["Group name"]=data["Group name"];
   this["Number of group members"]= data["Number of group members"];
   this.F= data.F;
   this.M = data.M;
   this.Discount= data.Discount;
   this.Dis= data.Dis;
   this["Reg type1"]= data["Reg type1"];
   this["Reg type2"] =data["Reg type2"];
   this["Reg type3"] = data["Reg type3"]
   this.Latitude = data.Latitude;
   this.Longitude=data.Latitude;
   }

   toGroupType() {
      let group: GroupType = {
         name_of_group: this["Group name"],
         latitude: this.Latitude,
         longitude: this.Longitude,
         kata: this.Kata,
         kijiji: this.Kijiji,
         mkoa: this.Mkoa,
         district: this.District,
         disabled_count: this.Dis,
         female_count: this.F,
         male_count: this.M,
         reg_type1: this["Reg type1"],
         reg_type2: this["Reg type2"],
         reg_type3: this["Reg type3"],
         namba_ya_barabara: this["Namba ya barabara"],
         urefu_wa_barabara: this["Urefu wa barabara"],
         number_of_group_members: this["Number of group members"]
      }
      return group
   }

}
export type GroupType = {
   id?: number,
   name_of_group: string,
   latitude: string | number,
   longitude: string | number,
   kata: string,
   kijiji: string,
   mkoa: string,
   district: string,
   disabled_count:number,
   female_count: number,
   male_count: number,
   reg_type1?: string,
   reg_type2?: string,
   reg_type3?: string,
   namba_ya_barabara?: string
   urefu_wa_barabara?: number,
   number_of_group_members: number

}
export type Member = {
   id: number,
   name: string,
   phone: string,
   group: string,
   date: string,
   region: string,
   district: string,
   gender: string,
   status?: string
}
export interface ISession {
   email?: string;
   accessToken: string
}
export interface IUserData {
   email: string;
   username?: string,
   location: string,
   password_expire: number,
   id: number,
   fname: string,
   lname: string,
   phone: string,
   position: number,
   department: number,
   busy: number,
   region: string,
   department_details: IUserDepartment
   position_detail: IUserPosition

}

export interface IUserDepartment {
   id: number,
   code: string,
   description: string,
   region: string,
   admin: number
}
export interface IUserPosition {
   id: number,
   value: string,
   actions: string
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
export type User = {
   id: number,
   username?: string,
   fname: string,
   lname: string,
   email: string,
   phone?: string,
   location?: string,
   position: number,
   department: number,
   dept_code?: string,
   busy: number,
   region: string,
   position_detail?: IUserPosition,
   department_detail?: IUserDepartment,

}
export type IUser = {
   id?: number,
   username?: string,
   empId?: string,
   fname: string,
   lname: string,
   email: string,
   phone?: string,
   location?: string,
   position: number,
   department: number,
   busy: number,
   password: string
}

export type Vehicle = {
   id: number,
   pnumber: string,
   chassis_no: string,
   location: string,
   brand: string,
   model: string,
   year: number,
   mileage: number,
   current_mileage: number,
   donor?: string,
   project?: string,
   fundcode?: string,
   a_cost?: string,
   a_date?: number,
   last_update?: number,
   in_use: number,
   last_location?: string,
   next_service_mileage: number
}

export type Trip = {
   start_city: string,
   destination_city: string,
   status: string,
   start_location: string,
   start_mileage: number,
   end_mileage: number,
   date_created: number,
   last_updated: number,
   id: number,
   start_time: string,
   end_time: string,
   remark: string,
   request_id: number,
   destination: string,
   driver: number,
   vehicle: string,
   vehicle_id: number,
   requestor: number,
   project: string,
   fundcode: string,
   approver: number,
   nameOfDriver: string,
   nameOfRequestor: string
}

export type Notification = {
   id: number,
   time_created: number,
   status: number,
   message: string,
   title: string,
   recipient: number,
   time_read: number,
   target: number,
   type: number
}

export type CustomTime = {
   h: number,
   m: number,
   s: number
}
export interface IRequest {
   id: number;
   requestor: number;
   type: number;
   destination: string;
   purpose: string;
   duration: null;
   start_time: number;
   end_time: number;
   project: string;
   fundcode: string;
   account: string;
   source: string;
   category: string;
   activity: string;
   status: number;
   remark: string;
   admin: number;
   remark1: string;
   approver: number;
   approved_by: number;
   attended_by: number;
   date_created: number;
   last_updated: number;
   vehicle: string;
   driver: number;
   vehicle_id: number;
   start_city: string;
   destination_city: string;
   start_location: string;
   closed_by: number;
   comment?: string;
   project_detail: IProjectDetail;
   statusText: string;
   nameOfApprover: string;
   nameOfDefaultApprover: string;
   nameOfCloser: string;
   nameOfDriver: string;
   nameOfAdmin: string;
   nameOfRequestor: string;
   nameOfAttender: string;
}
export interface IFuelRequest {
   id: number;
   requestor: number;
   type: number;
   vehicle: string;
   mileage: number;
   a_mileage: number;
   supplier: number;
   price: string;
   project: string;
   fundcode: string;
   account: string;
   source: string;
   category: string;
   activity: string;
   status: number;
   approver: number;
   approved_by: number;
   start_time: number;
   date_processed: number;
   amount: number;
   a_amount: number;
   a_price: string;
   date_created: number;
   remark: string;
   admin: number;
   remark1: string;
   comment: string;
   attended_by: number;
   closed_by: number;
   last_updated: number;
   supplier_name: string;
   project_detail: IProjectDetail;
   statusText: string;
   nameOfApprover: string;
   nameOfDefaultApprover: string;
   nameOfRequestor: string;
   nameOfCloser: string;
   nameOfAdmin: string;
   nameOfAttender: string;
   supplier_detail: ISupplier;
}
export interface IMaintenanceRequest {
   id: number;
   requestor: number;
   type: number;
   vehicle: string;
   mileage: number;
   a_mileage: number;
   supplier: number;
   price: string;
   project: string;
   fundcode: string;
   account: string;
   source: string;
   category: string;
   activity: string;
   status: number;
   approver: number;
   approved_by: number;
   start_time: number;
   date_processed: number;
   amount: number;
   a_amount: number;
   a_price: string;
   date_created: number;
   remark: string;
   admin: number;
   remark1: string;
   comment: string;
   attended_by: number;
   closed_by: number;
   last_updated: number;
   supplier_name: string;
   project_detail: IProjectDetail;
   statusText: string;
   nameOfApprover: string;
   nameOfDefaultApprover: string;
   nameOfRequestor: string;
   nameOfCloser: string;
   nameOfAdmin: string;
   nameOfAttender: string;
   supplier_detail: ISupplier;
   cost: string;
   parts: string;
   description: string;
   startTime: string;
   location: string
}
export interface ISupplier {
   id: number;
   name: string;
   service: string;
   tin?: string;
   region: string;
}
export interface IProjectDetail {
   id: number;
   name: string;
   code: string;
   start_date: number;
   end_date: number;
   donor: string;
   coordinator: number;
   status: number;
   comment?: string;
   department: number;
   department_detail: IDepartmentDetail;
}

export interface IDepartmentDetail {
   id: number;
   code: string;
   description: string;
   region: string;
   admin: number;
}

export interface Fundcode {
   id: number;
   project: string;
   code: string;
   expiration: number;
   activities: string;
}

export interface ISummaryCard {
   title: string,
   value: string | number,
   name?: string,
   id?: string | number,
   bg?: string,
   color?: string
}

export interface IRequestStatusBadge {
   icon: IconType
   text: string,
   color: string
}

export enum RequestStatus {
   "PENDING" = 0,
   "APPROVED" = 1,
   "AUTHORIZED" = 2,
   "CLOSED" = 3,
   "REJECTED" = 4,
   "CANCELLED" = 5

}
