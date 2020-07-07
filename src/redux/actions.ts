const action = (type: string, data?: any, error?: any) => {
  return {
    type: type,
    payload: { data: data, error: error },
  };
};
export default action;
