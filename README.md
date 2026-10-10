# klepaas-sample-node

K-Le-PaaS의 두 번째 앱 실증([K-Le-PaaS #55](https://github.com/kjhyeon0620/K-Le-PaaS/issues/55))에 쓰는 샘플 HTTP 앱입니다. 의존성 없이 Node.js 표준 라이브러리만 씁니다.

| 경로 | 응답 |
|---|---|
| `GET /version` | `{"version": "<앱 버전>", "greeting": "<SAMPLE_GREETING>"}` |
| `GET /health` | `200 ok` |

- 포트: `8080` (`PORT`로 변경 가능)
- 필수 환경 변수: `SAMPLE_GREETING`. 없으면 오류를 출력하고 종료합니다.
- 테스트: `node --test`

## 배포

`main` push 시 GitHub Actions가 테스트 → linux/arm64 이미지 빌드 → `ghcr.io/kjhyeon0620/klepaas-sample-node:sha-<commit>` push → GitHub OIDC 토큰으로 K-Le-PaaS 배포 API를 호출합니다.

수동 실행(`workflow_dispatch`)에 `image_tag`를 주면 빌드 없이 그 태그를 배포합니다. 이전 이미지 복구와 없는 이미지 실패 확인에 씁니다.

필요한 저장소 secret: `KLEPAAS_DEPLOY_URL`, `KLEPAAS_REPOSITORY_ID`.
