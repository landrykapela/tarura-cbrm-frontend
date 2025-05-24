import { IconType } from "react-icons";
import { Group, GroupType, ISession, IUserData, RoleEnum, RoleNameEnum } from "./types";
import { MdApps, MdAssessment, MdAssignment, MdDirectionsCar, MdExitToApp, MdNavigation, MdPeople, MdSettings } from "react-icons/md";

import { groups } from "../data";

export const getRawGroups = (): GroupType[] => {
  return groups.map((g: any, index: number) => {
    const gr = new Group(g);
    let group: GroupType = gr.toGroupType();
    return group
  })
}
export const getGeodata = (): GroupType[] => {
  return []
}
export const getRatio = (number1: number, number2: number) => {
  return number2 > 0 ? (number1 / number2).toFixed(1) : number1
  // const min = Math.min(number1,number2);
  // const r1 = min > 0 ? (number1/min) : number1;
  // const r2 = min > 0 ? number2/min: number2;
  // if(r1 > r2 && (r1 % r2 == 0) && r2 !=0) return `${(r1/r2).toFixed(2)}:1`;
  // if(r2 > r1 && (r2 % r1 == 0) && r1 !=0) return `1:${(r2/r1).toFixed(2)}`;
  // return `${r1}:${r2}`
}
export const saveSession = (session: ISession) => {
  sessionStorage.setItem('session', JSON.stringify(session));
}

export const getUserSession = (): ISession | null => {
  const session = sessionStorage.getItem("session") as unknown as string;
  return session && session != 'null' ? JSON.parse(session) as ISession : null;
}

export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}
export const getStoredUserData = (): IUserData | null => {
  const data = localStorage.getItem('user') as unknown as string;
  return data && data != null && data != 'undefined' ? JSON.parse(data) as IUserData : null

}
export const getStatusMessage = (status: number): string => {
  switch (status) {
    default:
    case 0:
      return "Pending approval";
    case 1:
      return "Pending authorization";
    case 2:
      return "Already authorized";
    case 3:
      return "Request is closed";
    case 4:
      return "Request was rejected";
    case 5:
      return "Request was cancelled";

  }
}
export const clearSession = () => {
  localStorage.clear();
  sessionStorage.clear();
}
export const getIcon = (text: string | IconType): IconType => {
  let icon = MdAssignment;
  switch (text) {
    case 'apps':
      icon = MdApps;
      break;
    case 'people':
      icon = MdPeople;
      break;
    case 'settings':
      icon = MdSettings;
      break;
    case 'direction_cars':
      icon = MdDirectionsCar;
      break;
    case 'navigation':
      icon = MdNavigation;
      break;
    case 'assessment':
      icon = MdAssessment;
      break;
    case 'exit_to_app':
      icon = MdExitToApp;
      break;
    case 'assignment':
    default:
      icon = MdAssignment;
  }
  return icon;
}
export const dateFormatWithTime = (seconds: number, timeOnly: boolean) => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let dateObject = new Date(seconds * 1000);
  let hrs =
    dateObject.getHours() < 10
      ? "0" + dateObject.getHours()
      : dateObject.getHours();
  let mins =
    dateObject.getMinutes() < 10
      ? "0" + dateObject.getMinutes()
      : dateObject.getMinutes();
  let secs =
    dateObject.getSeconds() < 10
      ? "0" + dateObject.getSeconds()
      : dateObject.getSeconds();
  let date =
    dateObject.getDate() +
    " " +
    months[dateObject.getMonth()] +
    " " +
    dateObject.getFullYear();

  let time =
    " " +
    hrs +
    ":" +
    mins +
    ":" +
    secs;

  return timeOnly ? time : `${date}  ${time}`;
};
export const validatePhoneNumber = (phone: string): string | boolean => {
  let phoneNumber = phone ? phone.replaceAll(" ", "").replaceAll("-", "") : null;
  let validPhoneNumber: string | boolean = false;
  if (phoneNumber && phoneNumber.length > 9) {
    switch (phoneNumber.length) {
      case 10:
        validPhoneNumber = `255${phone.substr(1)}`; //trim leading 0 and prepend tz country prefix;
        break;
      case 12:
        validPhoneNumber = phoneNumber;
        break;
      case 13:
        if (phoneNumber.substr(0, 1) == '+') validPhoneNumber = phoneNumber.substr(1); //remove + sign and reassure country code
        break;
      default:
        validPhoneNumber = false;
        break;
    }
  }
  return validPhoneNumber;
};
export const dateFormat = (seconds: number): string => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let dateObject = new Date(seconds * 1000);
  let date =
    dateObject.getDate() +
    " " +
    months[dateObject.getMonth()] +
    " " +
    dateObject.getFullYear();

  return date;
};

export const formatNumber = (num: number | string): string => {
  return num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : 'N/A';
};

export const getQueryString = (url: string): string => {
  if (url && url.length > 4) {
    const parts = url.split("?");
    if (parts.length > 1) return `?${parts[1]}`;
    return ""
  }
  return ""

}


//validate email address
export const validateEmail = (email: string): boolean => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }

  return false;
};

//search username
export const userExists = (username: string, users: any[]): boolean => {
  let keyword = username.toLowerCase();
  users = users.filter((u) => {
    return u.username.toLowerCase().search(keyword) !== -1;
  });
  return users.length > 0;
};

export const groupByArray = (xs: any[], key: any) => {
  let result = xs.reduce((rv, x) => {
    let v = key instanceof Function ? key(x) : x[key];
    let el = rv.find((r: any) => r && r.key === v);
    if (el) {
      el.values.push(x);
    } else {
      rv.push({ key: v, values: [x] });
    }
    return rv;
  }, []);

  return result;
};

export const isEmailAvailable = (users: any[], email: string): boolean => {
  let user = users.filter((u) => {
    return u.email === email;
  });
  if (user && user.length > 0) return false;
  else return true;
};

export const isAdmin = (user?: IUserData | null) => {
  if (!user) return false;
  return user.role === 1
}

export const getMenuItems = () => {
  return [
    {
      "id": 0,
      "text": "Dashboard",
      "icon": "apps",
      "clicked": false
    },
    {
      "id": 1,
      "text": "Groups",
      "icon": "assignment"
    },
    {
      "id": 2,
      "text": "Members",
      "icon": "people"
    },
    {
      "id": 3,
      "text": "Settings",
      "icon": "settings"
    }
  ]
}

export const generateHelpTopics = () => {
  return [
    {
      "id": 1,
      "title": "Getting Started",
      "description": "A guide to help you set up your account and start using this system.",
      "category": "Account Setup",
      "content": "Welcome to our platform! This guide is designed to help you navigate the initial steps of setting up your account. You need to request the system administrator to register an account for you.\nIf you are the system administrator, go to login. After a successful login, navigate to Settings then you can add a user"
    },
    {
      "id": 2,
      "title": "Password Reset",
      "description": "Instructions on how to reset your password if you’ve forgotten it.",
      "category": "Account Security",
      "content": "Forgetting your password can be frustrating, but resetting it is quick and easy. This is a controlled system and therefore most security issues such as password resets are handled by the system's administrator. If you have forgotten your password, you need to contact the system administrator in order to reset your password.\nIn case you are the system adminstrator, you need to keep your password secure as you'll be locked out if you forget or lose it. A system adminstrator and other users can also change their password from the settings"
    },
    {
      "id": 3,
      "title": "How to Import Data",
      "description": "How to import data in Bulk",
      "category": "Data Management",
      "content": "Since groups and members can be registered offline, you can import in bulk into this system. To import groups you need to prepare a CSV file with headers in the first row. For group data to be correctly imported, the CSV file must follow the following format for headings:\n"+
      "name, region, district, ward, village, registrationDate, registrationNumber, registrationType, registrationStatus, chairmanName, chairmanPhone, secretaryName, secretaryPhone, treasurerName, treasurerPhone, membersCount, femalesCount, malesCount, disabledCount, latitude, longitude, roadCode, roadLength. \nThe order is not important. This means that the CSV must have a head row with the mentioned headings in any order.\n"+
      "If you want to import members, the process is the same except the CSV headings must be as below:\n"+
      "firstName,lastName, phoneNumber, age, region, district, ward, group, role, gender, village\n To import groups, navigate to the groups page and then import CSV. Similarly to import members, navigate to the members page and select import CSV"
    },
    {
      "id": 4,
      "title": "Download Data for GIS",
      "description": "How to download data to use in GIS.",
      "category": "Data Management",
      "content": "Group data are geo data and therefore can be visualized in a GIS system such as Google Earth, ArcGIS, etc. To achieve this, navigate to the dashboard and download the (.kml and .shp) files for each region."
    },
    
  ]


}

export const getRole = (roleId: number) => {
  switch (roleId) {
    case RoleEnum.ADMIN:
      return RoleNameEnum.ADMIN;
    case RoleEnum.USER:
      return RoleNameEnum.USER;
    default:
      return RoleNameEnum.USER
  }
}
export const isValidDateString = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}
export const swapTwoItems = (items:any[],firstItemIndex:number,secondItemIndex:number)=>{

  let tmp = items[firstItemIndex];
  items[firstItemIndex] = items[secondItemIndex];
  items[secondItemIndex] = tmp;
  return items;

}
export const cleanDate = (dateString: string): Date | null => {
  dateString = dateString.replaceAll(" ","-").replaceAll("/","-")
  var month: number;
  var day: number;
  var year: number;
  if (dateString.includes("-")) {
    const parts = dateString.split("-");
    if (parts.length >= 3) {
      month = Number(parts[0]);
      day = Number(parts[1]);
      year = Number(parts[2]);
      var tmp: number;

      if(month > 12){
        const new_parts = swapTwoItems(parts,0,1)
        month = new_parts[0];
        day = new_parts[1]
      }
      return new Date(`${month}-${day}-${year}`)
    }
    return null;
  }
  return null
}
