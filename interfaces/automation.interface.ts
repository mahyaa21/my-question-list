export interface selectedItemInterface {
  value: string;
  label: string;
}
export interface EventInterface {
  id: string;
  title: string;
  description: string;
  eventType: string;
  icon: any;
  actionAttributes?: Array<any>;
}

export interface ActionInterface {
  id: string;
  title: string;
  name: string;
  description: string;
  icon: any;
  actionAttributes: any;
}
