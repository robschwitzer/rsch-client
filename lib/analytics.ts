export const pageview = (page_path: string): void => {
  window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
    page_path,
  });
};

interface TEventArgs {
  action: string;
  params: {
    [key: string]: any;
  };
}
export const event = ({ action, params }: TEventArgs): void => {
  window.gtag("event", action, params);
};
