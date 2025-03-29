## Background
主要用來練習 DevOps 實作，包含自動化測試、自動建置 Docker image 與自動部署到遠端主機。

透過 GitHub Actions 完成 CI/CD 工作流程，達成開發到部署的自動流程。

## Introduction
當 Pull Request（指定好的 event） 被觸發時，GitHub Actions 會：
1. 自動進行 Node.js 的單元測試
2. 測試成功後建置 Docker image 並上傳至 Docker Hub
3. SSH 進遠端主機
4. `docker compose pull`
5. `docker compose up -d`更新服務

## Prerequisite
- 具備 Git 基本操作經驗
- 已安裝 Docker、Node.js、npm
- 遠端主機能透過 SSH 連線
- 擁有 GitHub Repository 與個人 Access Token 權限

## Installation

- Clone 此專案（建議 Fork 一份再 clone）
	- git clone https://github.com/Anna0131/DevOps-Practice.git

- 安裝套件
	- cd DevOps-Practice/backend
	- npm install

## Configuration
在 Github 上設定 Secrets（機敏資訊）和 Variables（一般參數）

前往 GitHub Repository → Settings → Secrets and variables → Actions → New repository secret & Variables 
### Setup the following:
1. secrets
	- `DOCKER_PASSWORD`
	- `DOCKER_USERNAME`
	- `SSH_HOST`
	- `SSH_PRIVATE_KEY`
	- `SSH_USER`
	- `WORK_DIR`
2. variables
	- `IMAGE_NAME`
	- `REGISTRY`
	- `REPO_PATH`

## 測試畫面
### Unit Test （單元測試）
- 說明：

	使用 Node.js Test Runner 進行，驗證單一 Method 或 Module 的邏輯是否正確，不依賴外部資源（ex:DB）
	
	```bash
	npm run test:unit
	```

- 執行畫面：
	- <img width="599" alt="image" src="https://github.com/user-attachments/assets/eff3d470-4168-4ac4-b0de-7fcdfd0299f2" />

### Integration Test (整合測試)
- 說明：

	模擬整體流程，確認多個模組整合後是否能正常協作（ex：登入流程、資料存取）
	模擬實際 HTTP request（使用 supertest），驗證系統內各 Module 整合起來是否能如預期運作。
	```bash
	npm run test:integration
	```

- 執行畫面：
	- <img width="655" alt="image" src="https://github.com/user-attachments/assets/0a038996-c75b-4a9f-b19f-d4e01d24af69" />

### Load Test (負載測試)
- 說明：

	使用 k6 工具模擬大量使用者同時發送 request，測試系統在壓力下的效能與穩定性。
	
	```bash
	npm run test:load
	```
 
- 測試設定：
	- 同時 40 個虛擬使用者（VUs）
 	- 測試持續 40 秒
  	- 模擬使用者不斷嘗試登入
  	  
- 測試指標：
  	- 平均響應時間
  	- 成功率
  	- 失敗率
  	- 若在極高併發情況下登入驗證會失敗，未來可進行優化（如 cache/session scaling）
 
  	  
- 執行畫面（測不同網站）：
	- <img width="802" alt="image" src="https://github.com/user-attachments/assets/d21fa8b8-59db-4ff6-9eee-4b47a963d090" />
 	- <img width="805" alt="image" src="https://github.com/user-attachments/assets/239515e5-87bc-4e3a-af41-3be651ac3a1f" />

### GitHub Actions Workflow 執行結果

- 觸發條件：PR 合併到 main 分支時自動觸發。
- 執行流程：
	1. 測試測過 → ✅
	2. 建置 Docker image 並推上 Docker Hub → ✅
	3. 自動部署到主機 → ✅

- GitHub Actions 成功畫面
<img width="1158" alt="image" src="https://github.com/user-attachments/assets/751dc7ae-bb0d-4e46-8035-0e3e49c64db8" />

- 每個 Job 的細節
	- <img width="1157" alt="image" src="https://github.com/user-attachments/assets/556805bf-6934-484c-bc22-e03b78ab9727" />
	- <img width="1150" alt="image" src="https://github.com/user-attachments/assets/06c6af7d-e17a-4556-a547-fc2ac0137c25" />
	- <img width="1147" alt="image" src="https://github.com/user-attachments/assets/4a5fdb1c-697f-4a46-a7aa-50379fce93ff" />
- 若某 Job 沒有完成，則不會繼續往下做
	- <img width="1308" alt="image" src="https://github.com/user-attachments/assets/118045cf-5da7-4ba0-af67-2bfa0cf2b4e5" />
 
- All Workflow
	- <img width="1150" alt="image" src="https://github.com/user-attachments/assets/97cf28ea-d06a-457b-8131-9bb340988567" /> 


