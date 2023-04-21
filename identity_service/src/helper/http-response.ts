export type httpResponse = {
  status: number;
  data: Object;
  headers: Object;
};

export default function makeResponse(
  status: number,
  data: Object,
  headers: Object = {}
): httpResponse {
  return {
    headers,
    status,
    data: {
      ...data,
      success: true,
    },
  };
}
