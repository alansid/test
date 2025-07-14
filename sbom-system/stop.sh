#!/bin/bash

# SBOM 系統停止腳本

echo "🛑 SBOM 管理系統停止腳本"
echo "========================="

# 停止後端服務
stop_backend() {
    if [ -f "backend.pid" ]; then
        backend_pid=$(cat backend.pid)
        echo "🔧 停止後端服務 (PID: $backend_pid)..."
        
        if kill -0 $backend_pid 2>/dev/null; then
            kill $backend_pid
            echo "✅ 後端服務已停止"
        else
            echo "⚠️  後端進程不存在"
        fi
        
        rm -f backend.pid
    else
        echo "⚠️  未找到後端 PID 文件"
    fi
}

# 停止前端服務
stop_frontend() {
    if [ -f "frontend.pid" ]; then
        frontend_pid=$(cat frontend.pid)
        echo "🎨 停止前端服務 (PID: $frontend_pid)..."
        
        if kill -0 $frontend_pid 2>/dev/null; then
            kill $frontend_pid
            echo "✅ 前端服務已停止"
        else
            echo "⚠️  前端進程不存在"
        fi
        
        rm -f frontend.pid
    else
        echo "⚠️  未找到前端 PID 文件"
    fi
}

# 清理進程
cleanup_processes() {
    echo "🧹 清理相關進程..."
    
    # 查找並停止可能的 Spring Boot 進程
    spring_pids=$(pgrep -f "spring-boot:run")
    if [ -n "$spring_pids" ]; then
        echo "停止 Spring Boot 進程: $spring_pids"
        kill $spring_pids 2>/dev/null
    fi
    
    # 查找並停止可能的 Angular 進程
    ng_pids=$(pgrep -f "ng serve")
    if [ -n "$ng_pids" ]; then
        echo "停止 Angular 進程: $ng_pids"
        kill $ng_pids 2>/dev/null
    fi
    
    # 等待進程完全停止
    sleep 3
    
    echo "✅ 進程清理完成"
}

# 顯示狀態
show_status() {
    echo ""
    echo "📊 系統狀態檢查"
    echo "================"
    
    # 檢查端口使用情況
    backend_port=$(netstat -tulpn 2>/dev/null | grep ":8080" || echo "")
    frontend_port=$(netstat -tulpn 2>/dev/null | grep ":4200" || echo "")
    
    if [ -z "$backend_port" ]; then
        echo "✅ 後端端口 (8080) 已釋放"
    else
        echo "⚠️  後端端口 (8080) 仍被占用"
    fi
    
    if [ -z "$frontend_port" ]; then
        echo "✅ 前端端口 (4200) 已釋放"
    else
        echo "⚠️  前端端口 (4200) 仍被占用"
    fi
    
    echo ""
    echo "🎉 SBOM 系統已停止"
}

# 主函數
main() {
    stop_backend
    stop_frontend
    cleanup_processes
    show_status
}

# 執行主函數
main