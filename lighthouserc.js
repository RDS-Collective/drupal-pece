# Lighthouse CI Configuration
ci:
  collect:
    url:
      - http://127.0.0.1:8080/
      - http://127.0.0.1:8080/user/login
      - http://127.0.0.1:8080/node/add
    settings:
      chromeFlags: "--no-sandbox --disable-dev-shm-usage"
  assert:
    assertions:
      "categories:performance": ["warn", {"minScore": 0.7}]
      "categories:accessibility": ["error", {"minScore": 0.9}]
      "categories:best-practices": ["warn", {"minScore": 0.8}]
      "categories:seo": ["warn", {"minScore": 0.8}]
  upload:
    target: temporary-public-storage
