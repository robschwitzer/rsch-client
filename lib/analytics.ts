const isProduction = (): boolean => process.env.NODE_ENV === 'production';

const prodOnly = (fn: Function): Function => (args: any): void => {
  if (isProduction()) {    
    return fn(args);
  }  
  return undefined;
}

export const pageview = prodOnly((page_path: string): void => {  
  window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
    page_path,
  });
});

interface TEventArgs {
  action: string;
  params: {
    [key: string]: any;
  };
}
export const event = prodOnly(({ action, params }: TEventArgs): void => {
  window.gtag("event", action, params);
});
