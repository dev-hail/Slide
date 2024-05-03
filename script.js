F.Cr = t => document.createElement(t),
F.has = (t, i) => i.hasOwnProperty(t),
F.p = (t) => e = F.Is.str(t) ? "#" === t.charAt(0) ? F.G.id(t.substring(1)) : F.G.class(t.substring(1)) : [].concat([t]),
F.Gt =  {
    i: (t) => {
        var o,
            i,
            s,
            style = (o = e.style.transform, i=o.indexOf("("), s=o.slice(i+1, -1), s.split(",")),
            x = style[0].trim(),
            y = style[1].trim()
        return "x" === t ? x : y
    },
    x: (e) => {
        return F.Gt.i("x")
    },
    y: (e) => {
        return F.Gt.i("y")
    }
},
F.Ease = {
    lin: e => e,
    i1: e => 1 - Math.cos((e * Math.PI) / 2),
    o1: e => Math.sin((e * Math.PI) / 2),
    io1: e => -(Math.cos(Math.PI * e) - 1) / 2,
    i2: e => e * e,
    o2: e => 1 - (1 - e) * (1 - e),
    io2: e => e < 0.5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2,
    i3: e => e * e * e,
    o3: e => 1 - Math.pow(1 - e, 3),
    io3: e => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2,
    e4: e => e * e * e * e,
    o4: e => 1 - Math.pow(1 - e, 4),
    io4: e => e < 0.5 ? 8 * e * e * e * e : 1 - Math.pow(-2 * e + 2, 4) / 2,
    o6: e => e === 1 ? 1 : 1 - Math.pow(2, -10 * e),
    io6: e =>  e === 0 ? 0 : e === 1 ? 1 : e < 0.5 ? Math.pow(2, 20 * e - 10) / 2 : (2 - Math.pow(2, -20 * e + 10)) / 2
},
F.O = class {
    constructor() {
        this.arr = []
        var j = new F.t()
        F.BG(this, ["add", "init", "graf", "syn", "braf"])
        this._ = j.add({
            arr: [],
            trig: (v) => {
                v.disable && F.pe(v.disable)
                setTimeout(this.init.bind(this), v.id, v)

            }
        })
        this.raf = new F.RafR(this.braf)
    }
    add(t) 
    {
        this._.push(t)
        return !1
    }
    init(x) {
        const e = x.el,
              r = x.rev || !1;
        for (var i=0;i<e.length;i++) {
            if (r) {
                var a = e[i],
                    o = Object.keys(r.t);
                const z = {...a["t"]}
                for(var p = 0;p<o.length;p++) {
                    a["t"] = {
                        [o[p]]: {
                            i: r.t[o[p]].i || z[o[p]].targ,
                            curr: r.t[o[p]].curr || z[o[p]].targ,
                            targ: r.t[o[p]].targ || -z[o[p]].i
                        }
                    }
                }
            } else {
                e[i].p = {
                    ease: x.ef,
                    d: x.d,
                    de: x.de*i || 0,
                    prog: 0,
                    el: (r) => performance.now() - r.b,
                    et: 0
                }
                Object.keys(x.c).forEach(p => {
                    e[i][p] = x.c[p]
                })
                e[i].up = this.prop.bind(this)
            }
            if (i==0)
                e[i].pre = x.pre || !1
            if (i==e.length-1) 
                e[i].disable = x.disable || !1,
                e[i].post = x.post
            this.syn(e[i])
        }
    }

    syn(r) {
        this.delay = new F.Delay(this.graf, r.p.de, r);
        this.delay.run()
    }

    prop(m) {
        var { t, r, o, s } = m;
        [t, r, o, s].forEach(z => {
            var f = F.Is.def(z) ? Array.from(Object.keys(z)) : !1
            if (f) {
                f.forEach(n => {
                    z[n].curr = F.Lerp(z[n].i, z[n].targ, F.Ease[m.p["ease"]](m.p.prog))
                })
            }
        })
        if (t) {
            var x = F.has("x", t) ? t.x.curr + '%' : 0,
                y = F.has("y", t) ? t.y.curr + '%' : 0,
                f = 0 === x + y ? 0 : `translate3d(${x}, ${y}, 0)`;
        }
        r = F.has("r", t) ? t.r.name + `(${t.r.curr}deg)` : 0,
        s = F.has("s", t) ? `skew(${s.x || 0}deg, ${s.y || 0}deg)` : 0,
        t = t + r + s === 0 ? 0 : [f, r, s].filter(i => i !== 0).join(" "),
        o = F.has("o", m) ? o ? o.v.curr : -1 : -1;
        m.style.transform = t;
        0 <= o && (m.style.opacity = o)
        m.pre && m.pre()
    }

    graf(r) {
        if (!r.p.el >= r.de) 
            return;
        r.b = performance.now()
        this.arr.push(r)
        this.raf.run()
    }

    braf() {
        if (this.arr.length === 0)
            this.raf.stop()
        this.arr.forEach(k => {
            var p = k.p
            1 === p.prog && p.et >= p.d ? (p.prog = 0, this.arr = this.remove(k, this.arr)) : (p.et = F.Clamp(0, p.d, p.el(k)), p.prog = F.Clamp(0, 1, p.et/p.d), k.up(k))
        })
    }

    remove(a, b) {
        setTimeout(() => a.disable && F.pe(a.disable, !0), 100)
        return (a.post && a.post(), b.filter(i => i !== a))
    }
},
F.t = class {
    constructor() {
        F.BG(this, ['add'])
    }

    oC(t, p, v) {
        if ("length" === p) return !0;
        Reflect.set(t, p, v),
        this.v.trig(v);
        return true;
    }

    add(t) {
        this.v = t;
        this.t = new Proxy(this.v.arr, {
            set: this.oC.bind(this)
        })
        return this.t
    }
},
F.Delay = class {
    constructor(c, d) {
        this.cb = c,
        this.d = d,
        this.args = Array.from(arguments).slice(2)
        F.BG(this, ["loop", "run"]);
        this.raf = new F.RafR(this.loop)
        this.run()
    }

    run() {
        this.d === 0 ? this.cb.apply(null, this.args) : this.raf.run()
    }

    loop(t) {
        t = F.Clamp(t, 0, this.d)
        1 === F.Clamp(t/this.d, 0, 1) && (this.raf.stop(), this.cb.apply(null, this.args))
    }
},
F.BG = (r, e) => {
    var s = e.length;
    for (let t = 0; t < s; t++)
        r[e[t]] = r[e[t]].bind(r)
},
F.S = {
    C: (x, y, z) => {
        var e = F.Is.arr(x) ? x : !1
        if (!e)
            return (x.style[y] = z, true)
        e.forEach(h => {
            h.style[y] = z
        })
        return true
    },
    pe: (x, y) => F.S.C(x, "pointerEvents", y ? "all" : "none"),
    o: (x, y) => F.S.C(x, "opacity", y ? 1 : 0),
    d: (x, y) => F.S.C(x, "display", y ? "block" : "none"),
    bg: (x, y) => F.S.C(x, "backgroundColor", y),
    c: (x, y) =>  F.S.C(x, "color", y)
}
let preR = 0;
const FR = 1e3 / 60,
    RM = (F.Raf = class {
        constructor()
        {
            this.g = []
            this.on = !0

            F.BG(this, ["loop"])
            this.raf();
        }
        add(a)
        {
            this.g.push(a);
            this.arg = a.arg
        }
        remove(f)
        {
            let k = this.l();
            for (; k--;)
                if (this.g[k].token === f)
                    return void this.g.splice(k, 1)
        }
        loop(g)
        {
            if (this.on) {
                this.t || (this.t = g),
                preR = (g - this.t) / FR,
                this.t = g;
                let l = this.l();
                for (; l--;) {
                    var f,
                        q = this.g[l];
                    F.Is.def(q) && (q.sT || (q.sT = g), f = g - q.sT, q.cB.apply(null, [f, ...this.arg]))
                }
            }
            this.raf()
        }
        raf()
        {
            requestAnimationFrame(this.loop)
        }
        l = () => this.g.length
    }, new F.Raf);
let RiD = 0;
F.RafR = class {
    constructor(t)
    {
        this.on = !1,
        this.cb = t,
        this.n = RiD,
        RiD++
    }
    run()
    {
        this.arg = Array.from(arguments)
        this.on || (RM.add({
            token: this.n,
            cB: this.cb,
            arg: this.arg
        }), this.on = !0)
    }
    stop()
    {
        this.on && (RM.remove(this.n), this.on = !1)
    }
}


!function() {
	
	"use strict";

	class Cons {
		constructor() {
			this.uptime();
			this.ednam();
			this.custom()
			this.ctdots()
            localStorage.TaskCount = localStorage.TaskCount || 0
            F.BG(this, ["uptime", "ednam", "custom", "ctdots", "cresp"])
			const newObj = new MGsys()
            const intz = new accs
		}

		cresp(e, t) {
			e.innerHTML = '';
			var tex = t.split('');
			tex.forEach(k => {
				var span = F.Cr('span');
				span.innerHTML = k == ' ' ? '&nbsp' : k;
				e.appendChild(span);
			})
		}

		uptime() {
			this.syt = F.Cl.snd();
			var tholder = F.G.qs('#time>span');
			var ht = tholder.innerHTML.match(/[^A-Za-z \/ <> ^\r\n\t]/g)?.join('');
			var th = F.G.qs('#greet>span:nth-child(2)')
			if (ht !== this.syt) {
				this.cresp(tholder, F.Cl.snd());
				if (F.Cl.hrs() >= 5 && F.Cl.hrs() < 12) {
					this.cresp(th, 'Morning')
				} else if (F.Cl.hrs() >= 12 && F.Cl.hrs() < 17) {
					this.cresp(th, 'Afternoon')
				} else {
					this.cresp(th, 'Evening')
				}
			}
			setTimeout(this.uptime.bind(this), 200);
		}

		ednam() {
			var ph = F.G.id('dispen');
			var th = F.G.id('name');
			ph.value = F.Is.und(localStorage.usn) ? '' : localStorage.usn;
			this.cresp(th, ph.value);
			ph.addEventListener('input', (e) => {
				localStorage.usn = ph.value = e.target.value;
				this.cresp(th, ph.value);
			})
		}

		ctdots(e) {
			F.L.add('click', (e) => {
				var k = Array.from(F.G.class('pref scr'))
				var tg = F.G.id(e.target.getAttribute('for'))
				if (tg.checked == !1) {
					if (tg == clk24) {
						localStorage.tpref = '24'
					} else {
						var at = F.G.id(tg.getAttribute('name'))
						F.A.o(at, 1)
					}
				} else {
					if (tg == clk24) {
						localStorage.tpref = '12'
					} else {
						var at = F.G.id(tg.getAttribute('name'))
						F.A.o(at, 0, true)
					}
				}
			}, F.G.qs('.scr', document, !0));
		}

		custom() {
			Array.from(F.G.class('custom')).forEach(e => {
				if (F.G.id(e.getAttribute('for')) != widgetp) {
					F.A.d(F.G.id(e.getAttribute('for')), 'none')
				} else {
					e.style.opacity = '1'
				}
			})
			F.L.add('click', (e)=> {
				var tg = F.G.id(e.target.getAttribute('for'));
                console.log(tg)
				Array.from(F.G.qs('.custom', document, !0)).forEach(k => {
					if (F.G.id(k.getAttribute('for')) != tg) {
						k.style.opacity = '0.5';
						F.A.d(F.G.id(k.getAttribute('for')), 'none');
					} else {
						F.A.d(tg, 'block')
						e.target.style.opacity = '1'
					}
				})
			}, F.G.qs('.custom', document, !0))
		}
	}

	class MGsys {
		constructor() {
			this.oats();
			this.wget();
            this.setB()
            F.BG(this, ["oats", "wget", "setB"])
			this.arr = [msc, tsc]
		}

		wget() {
			F.L.add('click', (e) => {
                var t = e.target
                t.opened = F.Is.def(t.opened) ? !t.opened : !0
                console.log(t.opened)
                var o = F.G.id(t.getAttribute('for'))
				if (o == set) {
					t.opened && F.s.class("blur", F.G.id("bg"))
                    !t.opened && F.s.class("blur", F.G.id("bg"), !0)
					this.arr.forEach(e => {
						var c = e.style,
							s = 'pointerEvents';
						c[s] = c[s] == 'none' ? 'all' : 'none';
					})
				}
                F.A.o(o)
                var f = (e) => {
                    t.opened = !t.opened
                    console.log(t.opened)
                    F.s.class("blur", F.G.id("bg"), !0)
                    F.A.o(o)
                    this.arr.forEach(e => {
                        F.s.pe(e, !0)
                    })
                    F.L.ken("click", f, F.G.id("bg-o"))
                }
                if (t.opened)
                    F.L.add("click", f, F.G.id("bg-o"))
                !t.opened && F.L.ken("click", f, F.G.id("bg-o"))
			}, [F.G.qs('#stn>span'), F.G.qs('#tdl>span')])
		}

		oats() {
			fetch("https://dummyjson.com/quotes?limit=0")
			  .then((res) => res.json())
			  .then((d) => {
			    var qh = F.G.qs('#quote div')
			    var ah = F.G.qs('#quote p')
			    var randint = Math.floor(Math.random() * (F.l(d.quotes) - 1))
			    qh.innerHTML = d.quotes[randint].quote;
			    ah.innerHTML = d.quotes[randint].author;
			  });
		}

        setB() {
            var k = "LhLRdu4bLPB33pltq6eOZX8JA0i77uBhvEUitSydBFo2kXH00YGs33ll",
                a = ["nature", "desert", "forest", "animal", "mountains"],
                ranp = Math.floor(Math.random() * (50 - 0 + 1) + 0),
                rant = Math.floor(Math.random() * ((a.length-1) - 0 + 1) + 0),
                url = `https://api.pexels.com/v1/search?query=${a[rant]}&orientation=landscape&per_page=50`
            fetch(url,{
              headers: {
                Authorization: k
              }
            })
           .then(t => {
             return t.json()
           })
           .then(res => {
             var r = document.querySelector(':root'),
                 p = res.photos,
                 s = p[ranp].src.original
                 r.style.setProperty("--url", `url(${s})`)
           })
        }
	}

    class accs {
        constructor() {
            F.BG(this, ["addE", "addT", "reO", "sort"])
            this.temp = F.G.qs('[data-ls]').content.firstElementChild,
            this.taskC = F.G.id('tdlb')
            F.L.add("keypress", this.addT, F.G.id('astask'))
            F.L.add("change", this.sort, F.G.id('tdo'))
            window.onload = () => this.reO()
        }

        addT(e, i) {
            var plh = this.temp.cloneNode(true),
                value,
                tasks = _C.tasks,
                checked;
            if (e.keyCode  == 13) {
                console.log("isit")
                var lt = F.l(e.target.value.split('')),
                    lh,
                    tasks = _C.tasks
                if (lt >= 1 && lt <= 20) {
                    value = e.target.value
                    tasks.Inbox[value] = {
                        id: ++localStorage.TaskCount,
                        c: F.Cl.date()
                    }
                    localStorage[`t${localStorage.TaskCount}`] = `${e.target.value};${F.Cl.date()}`
                    e.target.value = ''
                    tasks.Today[value] = tasks.Inbox[value]
                } else {
                    console.log('input is inproper')
                }
            }
            if (F.Is.str(e)) {
                var rt = e.split(";")
                tasks.Inbox[rt[0]] = {
                    id: i,
                    c: rt[1]
                }
                if (rt[1] === F.Cl.date()) {
                    tasks.Today[rt[0]] = tasks.Inbox[rt[0]]
                }
                if (F.Is.def(rt[2])) {
                    checked = !0
                    tasks.Completed[rt[0]] = tasks.Inbox[rt[0]]
                }
                value = rt[0]
            }
            if (e.keyCode === 13 || F.Is.str(e)) {
                plh.querySelector('th span:last-child').innerText = value
                checked && (plh.querySelector('input').checked = !0)
                this.taskC.append(plh)
                this.addE(plh)
            }
        }

        addE(c) {
            var tasks = _C.tasks
            F.L.add('click', (e) => {
                var lh = e.target.parentElement
                var idi = Array.from(this.taskC.children).indexOf(lh),
                    int = lh.querySelectorAll("span")[1].innerText
                localStorage.removeItem(`t${tasks.Inbox[int].id}`),
                lh.remove()
                delete tasks.Inbox[int]
                delete tasks.Today[int]
                delete tasks.Completed[int]
            }, F.G.class('del', c))
            F.L.add('click', (e) => {
                var t = e.target,
                    value,
                    td
                for (; t;) {
                    if ("TH" === t.tagName) {
                        var k = F.G.qs("span", t, !0)[1]
                        value = k.innerText
                        td = tasks.Inbox[value]
                        break;
                    }
                    t = t.parentNode
                }
                var temp = localStorage.getItem(`t${td.id}`)
                if (e.target.checked) {
                    localStorage[`t${td.id}`] += ";c"
                    tasks.Completed[value] = tasks.Inbox[value]
                } else if (!e.target.checked) {
                    var c = temp.indexOf("c")
                    localStorage[`t${td.id}`] = temp.substring(0, c-1);
                    delete tasks.Completed[value]
                }
            }, F.G.qs('input[name="task"]', c))
        }

        reO() {
            var tasks = Object.keys(localStorage).filter(e => /t[0-9]+/g.test(e)).sort()
            for (var i = 0; i<tasks.length ; i++) {
                var j = tasks[i].match(/[0-9]+/g)
                this.addT(localStorage[tasks[i]], j)
            }
        }

        sort(e) {
            var s = e.target.selectedOptions[0].innerText,
                tasks = _C.tasks[s],
                taskV = Object.keys(tasks)
            this.taskC.innerHTML = ""
            for (var j = 0; j<taskV.length; j++) {
                var nTask = this.temp.cloneNode(true)
                F.G.qs('th span:last-child', nTask).innerHTML = taskV[j]
                var a = localStorage[`t${tasks[taskV[j]].id}`].split(";")
                a[2] && (nTask.querySelector('input').checked = !0)
                this.taskC.append(nTask)
                this.addE(nTask)
            }
        }
    }
	const obj = new Cons();
}()

