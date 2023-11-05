const Endpoints = {
  ADMIN_TICKETS: (query?: string) =>
    `/admin-tickets${query ? `?category=${query}` : ""}`,
  BILLING: "/billing",
  BILLS: "/bills",
  BUSES: "/buses",
  CHAT: "/goat-chat",
  HOME: "/",
  LOGIN: "/login",
  NEWS: "/news",
  PARKING: "/parking",
  REGISTER: "/register",
  REGISTERBUSINESS: "/register-business",
  TICKET_VIEW: (id: string, x: number, y: number) =>
    `/ticket-view?id=${id}&x=${x}&y=${y}`,
  TICKETING: "/ticketing",
  TRAFFIC: "/traffic",
  WASTE: "/waste"
};

export default Endpoints;
