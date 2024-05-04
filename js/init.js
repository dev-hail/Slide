window._C = {
	s: 0,
	ts: 0,
	fs: 40,
  tasks: {
    Inbox: {},
    Today: {},
    Completed: {}
  }
};
window.F = {};
F.Is = {
  str: t=>"string" == typeof t,
  obj: t=>t === Object(t),
  arr: t=>t.constructor === Array,
  node: t=> t instanceof NodeList,
  htcol: t=> t instanceof HTMLCollection,
  def: t=>void 0 !== t,
  und: t=>void 0 === t
},

F.T = (t,s,r,e,p="")=>{
  e = F.Is.und(e) ? "%" : e;
  t.style.transform = "translate3d(" + s + e + "," + r + e + ",0) " + p
},

F.g = (t, r, e) => {
        return (t || document)["getElement" + r](e)
    },
    
F.G = {
    id: (t, r) => F.g(r, "ById", t),
    class: (t, r) => Array.from(F.g(r, "sByClassName", t)),
    tag: (t, r) => F.g(r, "sByTagName", t),
    qs: (t, r, a) => (r || document)["querySelector" + (a ? "All" : "")](t)
},

F.Gt = (e) => {
  var style = getComputedStyle(e).transform
  var matrix = new DOMMatrixReadOnly(style)
  return matrix.m41
},

F.C = {
  liv: (e) => e.getBoundingClientRect().left <= cW,
  inv: (e) => {
    s1 = []
    let g = Array.from(F.G.id('u').children)
    g.forEach(r => {
      let o = r.getBoundingClientRect()
      let k = (o.left >= 0 && o.right <= cW) || ((o.left >= 0 && o.left <= cW && o.right >= cW) || (o.left <= 0 && o.right <= cW && o.right >= 0) || (o.left<=0 && o.right>=0))
      if (k) {
        s1.push(r)
      }
    })
    return s1
    g = s1.length;

  }
},

F.S = (e, c, cls="", s="") => {
  let k = [];
  for (let z=0; z <= c; z++) {
    let inTe = e.children[z].innerText.split('');
    k.push(inTe)
  }
  k.forEach((ts, z) => {
    let spnt = '';
    ts.map(k => (spnt += k == ' ' ? 
      `<span class='gap'></span>` : 
      `<span class='${cls}' style='${s}'>${k}</span>`))
    e.children[z].innerHTML = spnt
  })
}, 
F.Cr = t=>document.createElement(t),
F.M = (i, p, e) => {
  let q = {
    rootMargin: p ? p : '0',
    threshold: e ? e : 0
  }
  return new IntersectionObserver(i, q)
},

F.L = {
        add: (t, f, e) => {
        	var e = F.Is.arr(e) || F.Is.node(e) || F.Is.htcol(e) ? Array.from(e) : [].concat(e)
        	e.forEach((l, k) => {
        		l.addEventListener(t, f)
        	})
        },
        ken: (t, f, e) => {
        	var e = F.Is.arr(e) || F.Is.node(e) || F.Is.htcol(e) ? Array.from(e) : [].concat(e)
        	e.forEach((l, k) => {
        		l.removeEventListener(t, f)
        	})
        }
},

F.Clamp = (l,a,n)=>Math.min(Math.max(l, a), n),
F.Lerp = (t, r, e) => t * (1 - e) + r * e,
F.l = (t) => t.length,
F.A = {
	d: (e, v) => {
		var ps = window.getComputedStyle(e).display
		if (F.Is.und(v)) {
			if (ps == 'none') {
				e.style.display = 'block'
			} else {
				e.style.display = 'none'
			}
		}
		if (v !== ps) {
			e.style.display = v
		}
	},
	o: (e, v, p) => {
    var t = e.style,
        s = 'opacity';
    const i = {
      s: (e) => {
            t[s] = t[s] == 0 ? 1 : 0;
          return v = t[s];
      }
    }
		t[s] = v
    F.Is.und(v) === !0 ? i.s(e) : true;
    if (v == 0) {
      e.style.pointerEvents = 'none'
    } else {
      e.style.pointerEvents = 'all'
    }
  }
},
F.s = {
    C: (x, y, z) => {
        var e = F.Is.arr(x) ? x : !1
        if (!e)
            return (x.style[y] = z, true)
        e.forEach(h => {
            h.style[y] = z
        })
        return true
    },
    d: (x, y) => {
        F.S.C(x, "display", y ? "block" : "none")
        F.S.pe(x, y ? !0 : !1)
    },
    pe: (x, y) => F.S.C(x, "pointerEvents", y ? "all" : "none"),
    o: (x, y) => F.S.C(x, "opacity", y ? 1 : 0),
    bg: (x, y) => F.S.C(x, "backgroundColor", y),
    c: (x, y) =>  F.S.C(x, "color", y),
    class: (v, e, t) => t ? e.classList.remove(v) : e.classList.add(v)
},
F.BG = (r, e) => {
    var s = e.length;
    for (let t = 0; t < s; t++)
        r[e[t]] = r[e[t]].bind(r)
};

!function clk(t) {

	let rt = new Date();
	var clock24 = rt.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
	var clock12 = rt.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).replace('AM', '').replace('PM','');
	var clock = F.Is.und(t) ? clock24 : t == '12' ? clock12 : clock24

	F.Cl = {
		hrs: () => rt.getHours(),
		mins: () => rt.getMinutes(),
    rawDate: () => rt.toLocaleString().split(",")[0].split("/"),
    date: () => F.Cl.rawDate()[1] + "/" + F.Cl.rawDate()[0],
		snd: () => clock
	}
	setTimeout(clk, 200, localStorage.tpref)
}(localStorage.tpref = '24')