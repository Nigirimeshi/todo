import v1 from '@/api/v1';

export default v1;

export function APIResponseError(message: string) {
  return Promise.reject({
    message: message
  });
}

export function APIResponseNotAsExpected(url: string) {
  return Promise.reject({
    message: 'The response returned by the API[' + url + '] is not as expected.'
  });
}