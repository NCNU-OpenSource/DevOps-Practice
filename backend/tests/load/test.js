import http from 'k6/http'

import { check, sleep } from 'k6'
const target = [
		
    { 
			name : "NCU",
			url : 'https://www.ncu.edu.tw',
    },/*
    { 
			name : "NCNU",
			url : 'https://www.ncnu.edu.tw',
    },
    { 
			name : "NYCU",
			url : 'https://www.nycu.edu.tw',
    },
    { 
			name : "NYCU-CSIT",
			url : 'https://it.cs.nycu.edu.tw',
    },
		
    { 
			name : "DevOps-Practice - get_products",
			url : 'http://163.22.17.116:6001/api/products',
    },*/
]

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http request 失敗的總比例要低於 1% 才能算通過
    http_req_duration: ['p(95)<200'], // 95% 的 requests 數回傳時間都要低於 200ms 以內才算通過
  },
  scenarios: {
    contacts: {
      executor: 'constant-vus',
      vus: 40,
      duration: '10s',
    },
  },
};

const headers = {
	'identity': 'lsa'
}

export default function () {
  for (let t of target) {
		let res = http.get(t.url, { headers })
		check(res, { 'success login': (r) => r.status === 200 })
		sleep(0.3)
  }
}
