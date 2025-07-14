#!/bin/bash

# SBOM 系統啟動腳本

echo "🚀 SBOM 管理系統啟動腳本"
echo "========================="

# 檢查必要的工具
check_requirements() {
    echo "📋 檢查系統需求..."
    
    # 檢查 Java
    if ! command -v java &> /dev/null; then
        echo "❌ Java 未安裝。請安裝 Java 17 或更高版本。"
        exit 1
    fi
    
    java_version=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | sed '/^1\./s///' | cut -d'.' -f1)
    if [ "$java_version" -lt 17 ]; then
        echo "❌ Java 版本過低。需要 Java 17 或更高版本，當前版本: $java_version"
        exit 1
    fi
    echo "✅ Java $java_version 已安裝"
    
    # 檢查 Maven
    if ! command -v mvn &> /dev/null; then
        echo "❌ Maven 未安裝。請安裝 Maven 3.6 或更高版本。"
        exit 1
    fi
    echo "✅ Maven 已安裝"
    
    # 檢查 Node.js
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js 未安裝。請安裝 Node.js 18 或更高版本。"
        exit 1
    fi
    
    node_version=$(node -v | sed 's/v//' | cut -d'.' -f1)
    if [ "$node_version" -lt 18 ]; then
        echo "❌ Node.js 版本過低。需要 Node.js 18 或更高版本，當前版本: $node_version"
        exit 1
    fi
    echo "✅ Node.js $node_version 已安裝"
    
    # 檢查 Angular CLI
    if ! command -v ng &> /dev/null; then
        echo "⚠️  Angular CLI 未安裝。正在安裝..."
        npm install -g @angular/cli@18
    fi
    echo "✅ Angular CLI 已安裝"
}

# 啟動後端
start_backend() {
    echo ""
    echo "🔧 啟動後端服務..."
    echo "==================="
    
    cd backend
    
    # 檢查是否已編譯
    if [ ! -d "target" ]; then
        echo "📦 首次編譯後端..."
        mvn clean install -DskipTests
    fi
    
    echo "🚀 啟動 Spring Boot 應用..."
    echo "後端將在 http://localhost:8080 啟動"
    echo "API 文檔: http://localhost:8080/api"
    echo ""
    
    # 在後台啟動
    nohup mvn spring-boot:run > ../backend.log 2>&1 &
    backend_pid=$!
    echo $backend_pid > ../backend.pid
    
    echo "✅ 後端已啟動 (PID: $backend_pid)"
    echo "📝 日誌文件: backend.log"
    
    cd ..
}

# 啟動前端
start_frontend() {
    echo ""
    echo "🎨 啟動前端服務..."
    echo "==================="
    
    cd frontend/sbom-frontend
    
    # 檢查是否已安裝依賴
    if [ ! -d "node_modules" ]; then
        echo "📦 安裝前端依賴..."
        npm install
    fi
    
    echo "🚀 啟動 Angular 開發服務器..."
    echo "前端將在 http://localhost:4200 啟動"
    echo ""
    
    # 在後台啟動
    nohup npm start > ../../frontend.log 2>&1 &
    frontend_pid=$!
    echo $frontend_pid > ../../frontend.pid
    
    echo "✅ 前端已啟動 (PID: $frontend_pid)"
    echo "📝 日誌文件: frontend.log"
    
    cd ../..
}

# 等待服務啟動
wait_for_services() {
    echo ""
    echo "⏳ 等待服務啟動..."
    echo "=================="
    
    echo "正在等待後端服務..."
    timeout=60
    counter=0
    while [ $counter -lt $timeout ]; do
        if curl -s http://localhost:8080/api/projects > /dev/null 2>&1; then
            echo "✅ 後端服務已就緒"
            break
        fi
        sleep 2
        counter=$((counter + 2))
        echo -n "."
    done
    
    if [ $counter -eq $timeout ]; then
        echo ""
        echo "❌ 後端服務啟動超時"
        echo "請檢查 backend.log 文件"
        exit 1
    fi
    
    echo "正在等待前端服務..."
    sleep 5
    echo "✅ 前端服務應該已就緒"
}

# 顯示系統信息
show_info() {
    echo ""
    echo "🎉 SBOM 系統啟動完成！"
    echo "======================"
    echo ""
    echo "📱 前端應用:  http://localhost:4200"
    echo "🔧 後端API:   http://localhost:8080/api"
    echo ""
    echo "📁 系統功能:"
    echo "   • 專案列表:  http://localhost:4200/projects"
    echo "   • 套件搜尋:  http://localhost:4200/search"
    echo "   • 統計資訊:  http://localhost:4200/dashboard"
    echo ""
    echo "📝 日誌文件:"
    echo "   • 後端日誌:  backend.log"
    echo "   • 前端日誌:  frontend.log"
    echo ""
    echo "🛑 停止系統:"
    echo "   ./stop.sh"
    echo ""
}

# 主函數
main() {
    check_requirements
    start_backend
    start_frontend
    wait_for_services
    show_info
}

# 執行主函數
main