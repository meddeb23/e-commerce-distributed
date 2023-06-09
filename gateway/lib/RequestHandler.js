import axios from "axios";
import FormData from "form-data";
import Authentication from "./AuthenticationVerifier.js";
const callService = async (method, data, url, headers, files) => {
  if (files) {
    const formData = new FormData();
    Object.keys(data).forEach((f) => {
      formData.append(f, data[f]);
    });
    Object.keys(files).forEach((f) => {
      if (Array.isArray(files[f]))
        files[f].forEach((i) => formData.append(f, i.data, i.name));
      else formData.append(f, files[f].data, files[f].name);
    });
    // formData.append("file", files.file.data, files.file.name);
    return await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...headers,
      },
    });
  } else {
    return await axios({ method, data, url, headers });
  }
};

export const requestFile = async (req, res, path, service) => {
  delete req.headers["content-length"];
  const { data, headers, status } = await axios({
    method: req.method,
    data: req.body,
    url: `http://${service.ip}:${service.port}/${path}`,
    headers: req.headers,
    responseType: "stream",
  });
  Object.keys(headers).forEach((h) => {
    res.setHeader(h, headers[h]);
  });
  return { data, status };
};

const getMatchedEndpoint = (endpoints, path, reqMethod) => {
  const resource = path.split('/').filter(Boolean);

  for (const endpoint of endpoints) {
    const { path, method, params } = endpoint;

    // Check if the HTTP method matches and the path parameters count matches
    let pathParams = path.split('/').filter(Boolean);

    if (method === reqMethod && pathParams.length === resource.length) {

      // Check if the path parameters match
      const paramMap = {};
      const matches = pathParams.every((param, index) => {
        if (param.startsWith(':')) {
          paramMap[param.slice(1)] = resource[index];
          return true;
        } else {
          return param === resource[index];
        }
      });
      if (matches) return endpoint
    }
  }
  return null
}

export const routingRequest = async (req, res, path, service) => {
  delete req.headers["content-length"];

  const endpoint = getMatchedEndpoint(service.endpoints, path, req.method)
  if (!endpoint)
    return {
      data: {
        message: "Service no found",
      },
      status: 404,
    };
  // if (endpoint.auth?.type === "jwt") {
  //   const isAuth = await Authentication.verifyJWT(req.headers.authorization)
  //   if (!isAuth) {
  //     req.logger.error(`Unauthorized access: route: ${endpoint}`)
  //     return {
  //       data: { message: 'Unauthorized' },
  //       status: 401
  //     }
  //   }
  //   if (!endpoint.auth.roles.includes(isAuth.user.role)) {
  //     req.logger.error(`Forbidden access: route: ${endpoint}, userId: ${isAuth.user.id}`)

  //     return {
  //       data: { message: 'Forbidden' },
  //       status: 403
  //     }
  //   }
  //   req.body.user = isAuth.user
  // }

  console.log(`http://${service.ip}:${service.port}/${path}`)
  const { data, headers, status } = await callService(
    req.method,
    req.body,
    `http://${service.ip}:${service.port}/${path}`,
    req.headers,
    req.files
  );
  Object.keys(headers).forEach((h) => {
    res.setHeader(h, headers[h]);
  });
  return { data, status };
};
