const llg = document.getElementById('left-leg');
const rlg = document.getElementById('right-leg');

let legAnimationT = 0;
let legAnimationT2 = 0;
function animateLegs() {
    const legAngle = Math.max(Math.sin(legAnimationT) * 30, 0) - 10;
    const legAngleR = Math.max(Math.sin(legAnimationT2) * 30, 0) - 10;
    llg.style.transform = `translate(85.127px, 714.025px) rotate(${legAngle}deg) translate(-85.127px, -714.025px)`;
    rlg.style.transform = `translate(77.392px, 711.116px) rotate(${legAngleR}deg) translate(-77.392px, -711.116px)`;
    legAnimationT += 0.1;
    legAnimationT2 = legAnimationT + 0.8;
    if (legAnimationT === 0) {
        setTimeout(animateLegs, 200);
    } else {
        setTimeout(animateLegs, 35);
    }
}

animateLegs();

class Point {
    constructor(x = 0, y = 0) { this.x = x; this.y = y; }
    toString() { return `${this.x},${this.y}`; }
    copy() { return new Point(this.x, this.y); }
    add(o) { return new Point(this.x + o.x, this.y + o.y); }
    sub(o) { return new Point(this.x - o.x, this.y - o.y); }
    scale(s) { return new Point(this.x * s, this.y * s); }
    mag() { return Math.sqrt(this.x**2 + this.y**2); }
    getUnit() {
        const m = this.mag();
        if (m === 0) return new Point();
        return new Point(this.x / m, this.y / m);
    }
}
var COLA_COLORS = [
    '#f04848',
    '#b78f55',
    '#f7d8aa',
    'white',
    'white',
    'white',
];

function randomColaColor() {
    return COLA_COLORS[Math.floor(Math.random() * COLA_COLORS.length)];
}

class Splasher {
    constructor(N, p1, p2, output) {
        this.output = output;
        this.N = N;
        this.p1 = p1;
        this.p2 = p2;
        this.splashes = [];
        this.init();
        this.gravity = new Point(0, 0);
    }

    randomSplash() {
        const dir = this.p2.sub(this.p1);
        const L = dir.mag();
        const v = dir.getUnit();
        const va = new Point(-v.y, v.x);
        const p = v.scale(Math.random() * L).add(this.p1);
        let angle = Math.random() * 90;
        let velocity = new Point(
            Math.random() * va.x,
            Math.sin(angle / 57.3),
        );//.add(va.scale(Math.cos(angle / 57.3)));
        // angle = Math.random() * 360 / 57.3;
        // velocity = new Point(
        //     Math.cos(angle),
        //     Math.sin(angle),
        // );
        velocity = new Point(
            -Math.random(),
            Math.random() - 0.5,
        );
        return {
            p,
            v: velocity.scale(Math.random() * 3 + 0.5),
            t: Math.floor(Math.random() * 20 + 5),
        };
    }

    updateSplash(s, e) {
        e.setAttribute('cx', s.p.x);
        e.setAttribute('cy', s.p.y);
        e.style.opacity = Math.min(s.t/10, 1);
    }

    init() {
        for(let i = 0; i < this.N; i++) {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            const s = this.randomSplash();
            circle.setAttribute('cx', s.p.x);
            circle.setAttribute('cy', s.p.y);
            circle.setAttribute('r', 0.8);
            circle.style.fill = 'white';
            this.output.appendChild(circle);
            this.splashes.push({
                e: circle,
                s,
            });
        }
    }

    step() {
        this.splashes.forEach(splash => {
            const { s, e } = splash;
            s.p = s.p.add(s.v.add(this.gravity));
            this.updateSplash(s, e);
            s.t--;
            if (s.t < 0) {
                splash.s = this.randomSplash();
            }
        });
    }

}

class Sparkle {
    constructor(id, startingPoint, dir, dirLen, element, t, opacityOffset, color = randomColaColor()) {
        this.id = id;
        this.startingPoint = startingPoint;
        this.dir = dir;
        this.dirLen = dirLen;
        this.element = element;
        this.t = t || 0;
        this.opacityOffset = opacityOffset !== undefined ? opacityOffset : Math.random() * 100;
        this.color = color;
    }

    getMoveTo(newElement, dir, dirLen) {
        return new Sparkle(
            this.id,
            this.startingPoint.add(this.dir.scale(this.dirLen)),
            dir,
            dirLen,
            newElement, 
            0,
            this.opacityOffset,
            this.color,
        );
    }

    step(stepSpeed = 0.01) {
        const p = this.currentPoint;
        this.element.setAttribute('cx', p.x);
        this.element.setAttribute('cy', p.y);
        const o = this.currentOpacity;
        this.element.setAttribute('r', o * 1.2);
        this.element.setAttribute('fill', this.color);
        // this.element.style.opacity = this.currentOpacity;
        this.t += stepSpeed;
    }

    get currentOpacity() {
        const sss = this.opacityOffset;
        const o = (Math.sin((this.t + this.opacityOffset) / (Math.PI * 2 / sss)) + 1) / 2;
        return o;
        return o < 0.5 ? 0 : 1;
    }

    get currentPoint() {
        return this.startingPoint.add(this.dir.scale(this.t * this.dirLen));
    }
}

class SvgDrawer {
    constructor(pathElement, outputElement, pathInfo, speed = 0.1) {
        this.pathElement = pathElement;
        this.outputElement = outputElement;
        this.pathInfo = pathInfo;
        this.sparkles = [];
        this.next = null;
        this.speed = speed;
    }

    setNext(n) {
        this.next = n;
    }

    getRandomSparkleStartingPosition() {
        const scalar = Math.random() * 0.75 + 0.125;
        const s = scalar * this.pathInfo.starterLength;
        return this.pathInfo.starterVec.scale(s).add(this.pathInfo.startingPointFrom);
    }

    createSparkle() {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.outputElement.appendChild(circle);
        const startingPosition = this.getRandomSparkleStartingPosition();
        const sparkle = new Sparkle(Math.random(), startingPosition, this.pathInfo.directionVector, this.pathInfo.directionLength, circle);
        this.sparkles.push(sparkle);
        return sparkle;
    }

    createCircle() {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.outputElement.appendChild(circle);
        return circle;
    }

    step(recreate = false) {
        this.sparkles.forEach(s => s.step(this.speed));
        const L = this.sparkles.length;
        this.sparkles = this.sparkles.filter(s => {
            if (s.t > 1) {
                this.outputElement.removeChild(s.element);
                if (this.next) {
                    const next = this.next;
                    const circle = next.createCircle();
                    const sparkle = s.getMoveTo(circle, next.pathInfo.directionVector, next.pathInfo.directionLength);
                    sparkle.step(0);
                    next.sparkles.push(sparkle);
                }
                return false;
            }
            return true;
        });
        const numNewSparkles = L - this.sparkles.length;
        if (recreate) for(let i = 0; i < numNewSparkles; i++) this.createSparkle();
    }

    static computePathData(element, indexables = [0,1,2,3]) {
        let points = [];
        {
            const p = SvgDrawer.elementToPoints(element);
            points = indexables.map(i => p[i]);
        }
        return SvgDrawer.computePathDataFromPoints(points);
    }

    static elementToPoints(element) {
        const points =[];
        const d = element.getAttribute('points').split(' ').map(Number);
        for(let i = 0; i < 4; i++) points.push(new Point(d.shift(), d.shift()));
        return points;
    }

    static computePathDataFromPoints(points) {
        const direction = points[2].sub(points[1]);
        const starterDir = points[1].sub(points[0]);
        return {
            points,
            directionVector: direction.getUnit(),
            directionLength: direction.mag(),
            startingPointTo: points[1],
            startingPointFrom: points[0],
            starterVec: starterDir.getUnit(),
            starterLength: starterDir.mag(),
        };
    }
}

const drawers = [];
let funnel;
{
    const SODA_FALL_A_PARENT_ID = 'SodaFall_A';
    const parent = document.getElementById(SODA_FALL_A_PARENT_ID);
    const outputElement = document.getElementById('sodaFall_A_render');
    const part1 = parent.querySelector('polygon');
    const part2 = parent.querySelector('polyline');
    const drawer = new SvgDrawer(part1, outputElement, SvgDrawer.computePathData(part1, [2,3,0,1]), 0.005);
    const drawer2 = new SvgDrawer(part2, outputElement, SvgDrawer.computePathData(part2, [1, 2, 3, 0]), 0.04);
    drawer.setNext(drawer2);
    drawers.push(drawer);
    drawers.push(drawer2);
    
    
    const parent2 = document.getElementById('sf_Abottom');
    const part3 = parent2.querySelector('polygon');
    const outputElement2 = document.getElementById('sf_Abottom_render');
    const drawer3 = new SvgDrawer(part3, outputElement2, SvgDrawer.computePathData(part3, [3,0,1,2]), 0.1);
    drawers.push(drawer3);
    drawer2.setNext(drawer3);
    drawers.push(new Splasher(200, drawer3.pathInfo.points[2], drawer3.pathInfo.points[3], outputElement2));

    const [part5, part4] = document.getElementById('SodaFall_B').querySelectorAll('polygon');
    const output3 = document.getElementById('SodaFall_B_render');
    let drawer4;
    {
        const points = SvgDrawer.elementToPoints(part4);
        const d3points = drawer3.pathInfo.points;
        const d = SvgDrawer.computePathDataFromPoints(points);
        const offset = new Point();
        const pnts = [
            d3points[1].add(offset), d3points[2].add(offset),
            points[1], points[0],
        ];
        drawer4 = new SvgDrawer(part4, output3, SvgDrawer.computePathDataFromPoints(pnts), 0.01);
    }
    drawers.push(drawer4);
    drawer3.setNext(drawer4);
    let drawer5;
    {
        const pts = SvgDrawer.elementToPoints(part5);
        const points = [
            pts[3],
            pts[0],
            pts[1],
            pts[2],
        ];
        drawer5 = new SvgDrawer(part5, output3, SvgDrawer.computePathDataFromPoints(points), 0.01);
    }
    drawers.push(drawer5);
    drawer4.setNext(drawer5);

    {
        const pouringCola = document.getElementById('pouring_cola');
        const part = pouringCola.querySelector('polygon')
        const points = SvgDrawer.elementToPoints(part);
        const out = document.getElementById('pouring_cola_render');
        funnel = new SvgDrawer(part, out, SvgDrawer.computePathDataFromPoints([
            points[3],
            points[0],
            points[1],
            points[2],
        ]), 0.02);
        drawers.push(funnel);

        drawers.push(new Splasher(100, points[1], points[2], out));
    }

}



function addSparkles(N, X = drawers[0]) {
    for(let i = 0; i < N; i++) {
        const s = X.createSparkle();
        s.t = 0;
    }
}
function getIntervalAddAmount(PC = 0.5) {
    return Math.random() < PC ? 1 : 0;
}
// addSparkles(20);

for(let i = 0; i < 400; i++) {
    drawers.forEach((d, i) => d.step());
    addSparkles(getIntervalAddAmount());
    addSparkles(getIntervalAddAmount(0.2), funnel);
}


setInterval(() => {
    drawers.forEach((d, i) =>d.step());
    addSparkles(getIntervalAddAmount());
    addSparkles(getIntervalAddAmount(0.2), funnel);
}, 30);