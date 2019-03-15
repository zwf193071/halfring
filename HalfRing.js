class HalfRing {
    /** 
     * @param {string} canvas - canvasID字符串
     * @param {int} radius - 圆环半径
     * @param {int} sX - 动态圆环起点X轴坐标
     * @param {int} sY - 动态圆环起点Y轴坐标
     * @param {int} eX - 动态圆环终点Y轴坐标
     * @param {int} eY - 动态圆环起点Y轴坐标
     * @param {int} lineWidth - 圆环宽度
     * @param {string} outerColor - 外部圆环颜色
     * @param {string} sgColor - 内部圆环起始/结束渐变色
     * @param {string} mgColor - 内部圆环中间渐变色
     * @param {int} percent - 内部圆环百分比
     * @param {string} lineCap - 圆环起点/终点绘制形状
     * @param {int} startAngle - 内部圆环绘制角度起点
     */
    constructor ({
        canvas,
        radius = 60,
        sX = 250,
        sY = 250,
        eX = 500,
        eY = 0,
        lineWidth = 15,
        outerColor = '#EBF3F9',
        sgColor = '#8963FF',
        mgColor = '#01BAFF',
        percent = 50,
        lineCap = 'round',
        startAngle = Math.PI,
    } = {}) {
        this.canvas = canvas
        this.radius = radius
        this.sX = sX
        this.sY = sY
        this.eX = eX
        this.eY = eY
        this.lineWidth = lineWidth
        this.outerColor = outerColor
        this.sgColor = sgColor
        this.mgColor = mgColor
        this.percent = percent
        this.lineCap = lineCap
        this.ctx = document.getElementById(this.canvas).getContext('2d')
        this.times = 10 // 10次绘制动态圆环
        this.startAngle = startAngle
        this.anglePerSec = Math.PI * (this.percent / 100) / this.times // 每个间隔滑动的弧度
        this.endAngle = this.startAngle + this.anglePerSec
        this.perInterval = ''
    }
    /**
     * 绘制外部圆环
     * @private
     */
    _drawOuterRing() {
        this.ctx.beginPath()
        this.ctx.arc(this.sX, this.sY, this.radius, 0, Math.PI, true)
        this.ctx.lineWidth = this.lineWidth
        this.ctx.lineCap = this.lineCap
        this.ctx.strokeStyle = this.outerColor
        this.ctx.stroke()
        this.ctx.closePath()
    }
    /**
     * 绘制内部圆环
     * @private
     */
    _drawInnerRing() {
        const g = this.ctx.createLinearGradient(this.sX, this.sY, this.eX, this.eY)
        let count = 1;
        g.addColorStop(0, this.sgColor)
        g.addColorStop(0.499, this.mgColor)
        g.addColorStop(0.501, this.mgColor)
        g.addColorStop(1, this.sgColor)
        
        this.perInterval = setInterval(function () {
            if (count == this.times) clearInterval(this.perInterval)
            this.ctx.beginPath()
            
            this.ctx.arc(this.sX, this.sY, this.radius, this.startAngle, this.endAngle, false);
            this.ctx.strokeStyle = g; 
            this.ctx.lineCap = this.lineCap; 
            this.ctx.stroke(); 
            this.ctx.closePath(); 
            this.startAngle += this.anglePerSec;
            this.endAngle = this.startAngle + this.anglePerSec
            count++;
        }.bind(this), 60)
    }
    drawRing () {
        this._drawOuterRing()
        this._drawInnerRing()
    }
}
module.exports = HalfRing