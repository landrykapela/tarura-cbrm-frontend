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
      "description": "A guide to help you set up your account and start using our services.",
      "category": "Account Setup",
      "content": "Welcome to our platform! This guide is designed to help you navigate the initial steps of setting up your account. First, visit our registration page where you'll need to enter your email and create a secure password. After submitting your details, check your inbox for a confirmation email. Make sure to click the link provided to verify your account.\n\nOnce your account is verified, you can log in using your credentials. The dashboard will provide you with a snapshot of your account status, including any notifications or messages from our team. We recommend taking a moment to familiarize yourself with the layout and features available on the dashboard.\n\nNext, consider customizing your profile. Go to the 'Profile Settings' section where you can add personal information, update your preferences, and manage notification settings. This will ensure that you receive relevant updates and information tailored to your needs. If you have any questions, feel free to consult our FAQ section or reach out to support."
    },
    {
      "id": 2,
      "title": "Password Reset",
      "description": "Instructions on how to reset your password if you’ve forgotten it.",
      "category": "Account Security",
      "content": "Forgetting your password can be frustrating, but resetting it is quick and easy. Start by navigating to the login page and click on the 'Forgot Password?' link. This will take you to a page where you can enter the email address associated with your account.\n\nAfter submitting your email, check your inbox for a password reset link. Click on the link, and you will be directed to a secure page where you can create a new password. Choose a strong password that includes a mix of letters, numbers, and symbols to enhance your account security.\n\nOnce you’ve successfully reset your password, you can log in with your new credentials. Remember to keep your password safe and consider using a password manager to help you manage your passwords securely. If you encounter any issues during the reset process, don’t hesitate to contact our support team for assistance."
    },
    {
      "id": 3,
      "title": "How to Update Your Profile",
      "description": "Learn how to update your personal information and preferences.",
      "category": "Account Management",
      "content": "Keeping your profile up to date is essential for a personalized experience on our platform. To start, log in to your account and navigate to the 'Profile Settings' section found in the main menu. Here, you can edit various details such as your name, email address, and contact information.\n\nIn addition to basic information, you can also manage your preferences regarding communication from us. Whether you want to receive newsletters, updates, or notifications, you can customize these settings to ensure you stay informed without being overwhelmed.\n\nWe also encourage you to upload a profile picture. A friendly face helps foster a sense of community and can make interactions more personal. Remember to save any changes before exiting the profile section. If you have any questions about the process, our support team is here to help!"
    },
    {
      "id": 4,
      "title": "Managing Notifications",
      "description": "Steps to customize your notification settings to stay informed.",
      "category": "Settings",
      "content": "Managing your notification preferences is key to ensuring that you receive important updates while avoiding unnecessary distractions. To adjust these settings, log into your account and navigate to the 'Settings' menu. Here, you will find the 'Notifications' tab.\n\nIn the notifications section, you can choose which types of alerts you would like to receive. Options typically include email notifications for account activities, updates about new features, and reminders for upcoming events or deadlines. Select the preferences that suit your needs best.\n\nAdditionally, consider opting for push notifications if you’re using our mobile app. This way, you can stay informed in real-time. Always remember to save your settings after making changes. If at any point you feel unsure, refer to our help articles or contact support for guidance."
    },
    {
      "id": 5,
      "title": "Understanding Billing",
      "description": "An overview of our billing process, including payment methods and invoices.",
      "category": "Billing",
      "content": "Navigating the billing process is crucial for managing your account efficiently. Our platform offers multiple payment methods to suit your needs, including credit cards, debit cards, and PayPal. To set up your preferred payment method, go to the 'Billing' section within your account settings.\n\nYou can view your billing history and upcoming charges directly from this section. Detailed invoices are generated monthly, allowing you to keep track of your expenses easily. Each invoice includes a breakdown of services used, so you can see exactly what you’re paying for.\n\nIf you encounter any discrepancies or have questions about a charge, our support team is ready to assist you. We recommend regularly checking this section to ensure your billing information is current and to avoid any interruptions in service."
    },
    {
      "id": 6,
      "title": "Technical Support",
      "description": "Common troubleshooting steps for technical issues.",
      "category": "Technical Issues",
      "content": "Experiencing technical issues can be frustrating, but our support team is here to help. For common problems, we recommend starting with a few troubleshooting steps. First, ensure that your internet connection is stable. Many issues arise from connectivity problems, so verifying your network status is a crucial first step.\n\nIf you're facing difficulties with specific features or functions, try clearing your browser's cache or cookies. This can resolve many common display issues. Additionally, ensure that your browser is up to date for optimal performance.\n\nIf problems persist after these steps, our technical support team is available to assist you. You can reach them through the 'Contact Support' page on our website. We encourage you to provide detailed information about the issue to help us assist you more effectively."
    },
    {
      "id": 7,
      "title": "Using the Mobile App",
      "description": "A comprehensive guide on how to navigate and use our mobile application.",
      "category": "Mobile",
      "content": "Our mobile app is designed to provide you with a seamless experience on the go. Once you've downloaded the app, log in using your account credentials. The user interface is intuitive, with easy access to all the features available on our desktop version.\n\nExplore the main menu to navigate between different sections, such as your profile, notifications, and billing. You can also manage your settings directly from the app, ensuring that your preferences are always up to date.\n\nOne of the key features of our mobile app is the ability to receive push notifications. This allows you to stay updated on important account activities and new features in real-time. For any questions or issues while using the app, refer to the help section or contact support for assistance."
    },
    {
      "id": 8,
      "title": "Frequently Asked Questions",
      "description": "Answers to the most common questions from our users.",
      "category": "General",
      "content": "Our FAQ section is designed to address the most common inquiries from our users. Here, you will find answers to questions about account setup, billing, and troubleshooting. We encourage you to check this resource before reaching out to support, as many concerns can be resolved quickly through these answers.\n\nFor example, if you're curious about password security, our FAQ explains the best practices for creating a strong password and how to reset it if forgotten. Additionally, you can find information on subscription plans and how to change them based on your needs.\n\nWe update this section regularly based on user feedback, so if you have a question that isn’t answered, let us know! Your feedback helps us improve our resources and serve you better."
    },
    {
      "id": 9,
      "title": "Contacting Support",
      "description": "Learn how to get in touch with our support team for further assistance.",
      "category": "Customer Support",
      "content": "If you need assistance, our support team is here to help! You can reach out to us through multiple channels, including email, live chat, and our support ticket system. To get started, navigate to the 'Contact Support' page on our website.\n\nFor urgent issues, we recommend using the live chat feature. Our representatives are available during business hours to provide immediate assistance. If you prefer to send an email, please include as much detail as possible about your issue, along with your account information, to help us resolve your concerns more efficiently.\n\nWe aim to respond to all inquiries within 24 hours, but during peak times, it may take longer. Thank you for your patience, and we appreciate the opportunity to assist you!"
    },
    {
      "id": 10,
      "title": "Privacy Policy",
      "description": "Information about how we handle your data and privacy.",
      "category": "Privacy",
      "content": "Your privacy is our priority. Our Privacy Policy outlines how we collect, use, and protect your personal data. We want to ensure you feel secure and informed while using our services. We collect data primarily to enhance your user experience and provide personalized content.\n\nWe use industry-standard security measures to safeguard your information. This includes encryption protocols and regular security audits to protect against unauthorized access. We do not share your personal data with third parties without your consent, except in cases required by law.\n\nFor more detailed information, please review our full Privacy Policy on our website. If you have any questions or concerns about your data, feel free to reach out to our support team. Your trust is important to us, and we are committed to transparency."
    },
    {
      "id": 11,
      "title": "User Feedback",
      "description": "How to provide feedback and suggestions for improving our services.",
      "category": "General",
      "content": "We value your feedback! Our platform is designed to evolve based on user experiences, and your insights are crucial in shaping future updates. You can provide feedback directly through our website by navigating to the 'Feedback' section.\n\nWhether you have suggestions for new features, ideas for improving existing ones, or any other comments, we want to hear from you. We review all feedback thoroughly, and while we may not be able to respond to every submission, rest assured that your input is taken seriously.\n\nAdditionally, we often conduct surveys and polls to gather user opinions on specific features. Participating in these opportunities not only gives you a voice but also helps us prioritize enhancements that matter most to you."
    },
    {
      "id": 12,
      "title": "Troubleshooting Login Issues",
      "description": "Steps to resolve issues when logging into your account.",
      "category": "Account Security",
      "content": "Having trouble logging into your account? Don’t worry; this is a common issue that can usually be resolved easily. First, double-check that you are entering the correct email address and password. Remember, passwords are case-sensitive, so ensure that Caps Lock is not enabled.\n\nIf you've forgotten your password, simply click on the 'Forgot Password?' link on the login page. Follow the prompts to reset your password using the email associated with your account. After resetting, try logging in again with your new password.\n\nIf you are still experiencing issues, check to ensure that your internet connection is stable and that your browser is up to date. Clear your browser’s cache and cookies, as this can resolve many login-related problems. If all else fails, reach out to our support team for further assistance."
    },
    {
      "id": 13,
      "title": "Feature Requests",
      "description": "How to submit requests for new features or improvements.",
      "category": "General",
      "content": "We’re always looking to improve our platform, and your input is essential in helping us prioritize new features. If you have an idea or suggestion, please navigate to the 'Feature Requests' section on our website. Here, you can submit your idea and explain how it would benefit your experience.\n\nWe encourage you to be as detailed as possible in your submission. Include any specific functionality you envision and how it could enhance our services. This information will help our development team evaluate the feasibility of your request.\n\nIn addition to direct submissions, we also invite users to participate in discussions on our community forums. Engaging with other users can provide valuable insights and additional perspectives on your ideas. Thank you for helping us make our platform better!"
    },
    {
      "id": 14,
      "title": "Data Export and Import",
      "description": "Instructions on how to export your data and import it into other services.",
      "category": "Data Management",
      "content": "Managing your data is important, and we provide tools to help you export and import your information easily. To export your data, log into your account and navigate to the 'Data Management' section. Here, you’ll find options to download your data in various formats, such as CSV or JSON, making it compatible with many other services.\n\nOnce you've selected the data you wish to export, simply click the 'Export' button. Your data will be prepared and a download link will be emailed to you for your convenience. Please allow a few moments for this process, especially if you have a large amount of data.\n\nIf you're looking to import data from another service, our platform supports various import formats. Follow the instructions in the 'Import Data' section, and you’ll be guided through the process step-by-step. Should you encounter any issues, our support team is always ready to assist you."
    },
    {
      "id": 15,
      "title": "Using Advanced Features",
      "description": "A guide to utilizing advanced features and functionalities in our platform.",
      "category": "Features",
      "content": "Our platform offers a range of advanced features designed to enhance your user experience. To make the most of these functionalities, start by exploring the 'Advanced Features' section in your account settings. Here, you will find options such as automation tools, integrations with other applications, and customizable dashboards.\n\nOne of the standout features is the automation tool, which allows you to set up workflows that can save you time and streamline your processes. For instance, you can create automated alerts for important account activities or schedule regular reports to be sent directly to your inbox.\n\nAdditionally, our platform supports integrations with third-party applications, enabling you to synchronize your data across different tools seamlessly. This can improve your productivity and help you maintain a centralized system. If you have any questions or need guidance on how to use these advanced features effectively, refer to our help documentation or contact support."
    }
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
