function ApiService($http, $q) {
    const service = this;

    const resolve = (response) => response.data;
    const reject = (response) => $q.reject(response.data);

    service.delete = apiDelete;
    service.get = apiGet;
    service.post = apiPost;
    service.put = apiPut;

    function apiGet(endpoint) {
        return $http.get(endpoint).then(resolve, reject);
    }

    function apiPost(endpoint, data, httpConfig = {}) {
        return $http.post(endpoint, data, httpConfig).then(resolve, reject);
    }

    function apiPut(endpoint, data) {
        return $http.put(endpoint, data).then(resolve, reject);
    }

    function apiDelete(endpoint, data) {
        return $http({
            url: endpoint,
            method: 'DELETE',
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    return service;
}

export default angular
  .module('ng-starter.services.api', [])
  .service('api', ApiService)
  .name;
