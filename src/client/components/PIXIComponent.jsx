import React, { Component, PropTypes } from 'react';
import * as PIXI from 'pixi.js';

export default class PIXIComponent extends Component {
    constructor() {
        super();
        this._bullets = [];
        this._bulletSpeed = 5;
        this._playerSpeed = 3;

        this._playerDX = 0;
        this._playerDY = 0;

        this.animate = this.animate.bind(this);
        this.rotateToPoint = this.rotateToPoint.bind(this);
        this.shoot = this.shoot.bind(this);
        this.playerMove = this.playerMove.bind(this);
    }

    componentDidMount() {
        this._app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
        this.refs.gameCanvas.appendChild(this._app.view);

        let background = new PIXI.Graphics();
        background.beginFill(0x1099bb);
        background.drawRect(0,0,800,600);
        background.endFill();
        this._app.stage.addChild(background);

        this._player = PIXI.Sprite.fromImage('./assets/player.png');

        this._player.anchor.set(0.5);

        this._player.x = this._app.renderer.width / 2;
        this._player.y = this._app.renderer.height / 2;
        this._playerNewPositionX = this._player.x;
        this._playerNewPositionY = this._player.y;


        this._app.stage.addChild(this._player);

        this._app.stage.interactive = true;

        this._app.stage.on("mousedown", (e) => {
            this.shoot(this._player.rotation, {
                x: this._player.position.x,
                y: this._player.position.y
            });
        })

        this.animate();

        window.addEventListener(
            "keydown", this.keyDownHandler.bind(this), false
        );
        window.addEventListener(
            "keyup", this.keyUpHandler.bind(this), false
        );
    }



    componentDidUpdate() {
        this.updatePIXI();
    }

    updatePIXI() {

    }

    keyDownHandler(e) {
        if (e.keyCode === 32) {
            this.shoot(this._player.rotation, {
                x: this._player.position.x,
                y: this._player.position.y
            });
        }
        if (e.keyCode === 37 || e.keyCode === 65) { // left or a
            this.playerMove(-1, 0);
        }
        if (e.keyCode === 39 || e.keyCode === 68) { // right or d
            this.playerMove(1, 0);
        }
        if (e.keyCode === 38 || e.keyCode === 87) { // up or w
            this.playerMove(0, -1);
        }
        if (e.keyCode === 40 || e.keyCode === 83) { // down or s
            this.playerMove(0, 1);
        }
    }

    keyUpHandler(e) {
        if (e.keyCode === 37 || e.keyCode === 65) { // left or a
            this.playerMove(0, 0);
        }
        if (e.keyCode === 39 || e.keyCode === 68) { // right or d
            this.playerMove(0, 0);
        }
        if (e.keyCode === 38 || e.keyCode === 87) { // up or w
            this.playerMove(0, 0);
        }
        if (e.keyCode === 40 || e.keyCode === 83) { // down or s
            this.playerMove(0, 0);
        }
    }

    playerMove(dx, dy) {
        this._playerDX = dx * this._playerSpeed;
        this._playerDY = dy * this._playerSpeed;
    }

    shoot(rotation, startPosition) {
        let bullet = PIXI.Sprite.fromImage('./assets/bullet.png');
        bullet.position.x = startPosition.x;
        bullet.position.y = startPosition.y;
        bullet.rotation = rotation;
        this._app.stage.addChild(bullet);
        this._bullets.push(bullet);
    }

    rotateToPoint(mx, my, px, py) {
        let self = this;
        let dist_Y = my - py;
        let dist_X = mx - px;
        let angle = Math.atan2(dist_Y,dist_X) + Math.PI / 2;
        return angle;
    }

    animate() {
        requestAnimationFrame(this.animate);

        this._player.rotation = this.rotateToPoint(this._app.renderer.plugins.interaction.mouse.global.x, this._app.renderer.plugins.interaction.mouse.global.y, this._player.position.x, this._player.position.y);

        this._player.position.x += this._playerDX;
        this._player.position.y += this._playerDY;

        for(let b = this._bullets.length - 1; b >= 0; b--){
            this._bullets[b].position.x += Math.cos(this._bullets[b].rotation - Math.PI / 2) * this._bulletSpeed;
            this._bullets[b].position.y += Math.sin(this._bullets[b].rotation - Math.PI / 2) * this._bulletSpeed;
        }

        this._app.renderer.render(this._app.stage);
    }

    render() {
        return (
            <div className="pixi-container" ref="gameCanvas">
            </div>
        );
    }
}
