export default interface IDispatchAction {
  type: string;
  payload: {
    data: any;
    error: any;
  };
}
