// K-Le-PaaS 두 번째 앱 실증(#55)용 샘플 HTTP 앱. 의존성 없이 Node 표준 라이브러리만 쓴다.
const http = require("node:http");

const VERSION = "1.0.0";
const HEALTH_PATH = "/health";
const PORT = Number(process.env.PORT || 8080);

function createServer(greeting) {
  return http.createServer((req, res) => {
    if (req.method === "GET" && req.url === HEALTH_PATH) {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("ok");
      return;
    }
    if (req.method === "GET" && req.url === "/version") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ version: VERSION, greeting }));
      return;
    }
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
  });
}

if (require.main === module) {
  // 필수 설정이 없으면 바로 종료한다 (env 누락 실패 시나리오)
  const greeting = process.env.SAMPLE_GREETING;
  if (!greeting) {
    console.error("SAMPLE_GREETING 환경 변수가 없습니다. 종료합니다.");
    process.exit(1);
  }
  createServer(greeting).listen(PORT, () => {
    console.log(`klepaas-sample-node v${VERSION} listening on ${PORT} (health ${HEALTH_PATH})`);
  });
}

module.exports = { createServer, VERSION, HEALTH_PATH };
