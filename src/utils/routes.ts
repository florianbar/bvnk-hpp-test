export const getPayinRoutes = {
  confirm: (uuid: string): string => `/payin/${uuid}`,
  pay: (uuid: string): string => `/payin/${uuid}/pay`,
  expired: (uuid: string): string => `/payin/${uuid}/expired`,
};
