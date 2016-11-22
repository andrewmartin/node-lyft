export default {
  ACCESS_TOKEN_PATH: '/oauth/token',
  RIDE_TYPES_PATH: '/v1/ridetypes',
  ETA_PATH: '/v1/eta',
  COST_PATH: '/v1/cost',
  NEARBY_DRIVERS_PATH: '/v1/drivers',
  REQUIRED_CONFIG_KEYS: [
    "GOOGLE_API_KEY",
    "LYFT_API_URI",
    "LYFT_CLIENT_ID",
    "LYFT_CLIENT_SECRET",
    "LYFT_WWW_URI",
    "PORT",
    "SESSION_SECRET",
    "USE_SANDBOX"
  ],
  TOKEN_RESPONSE_STUB: {
    statusCode: 200,
    body: {
      token_type: 'Bearer',
      access_token: 'SANDBOX-gAAAAABYKse3wWeUNs8u5pEaXQ5P6oinw92ndfVVezd1hduMWj_agwsclqcB43RmcG_XswQBLgPGtGT84oQ66jHqCL1TC7r23py4jpK-k5Lor-wUuuwe1h3t15RGL3Wpu_RDiKuwpFygkE3mxcl1UTQ93Nk0vC-w2S1VmfU3dsKv98DM0IilT5L6EzzSc6IH6PJb9Y0GOjkOwg59lZsDzkskvLcFRl_o_tUVwlL1T-kWFbJckIWy87l3ZIx_raNAJXVPyRCa7d8__vAndX6bOKPZX544qMjgAl0rJrdUZ3tbB46NxfwxlCsDhTThIhD4iqmW0CQSw8_E',
      expires_in: 3600,
      scope: 'profile offline rides.read public rides.request'
    }
  }
};
