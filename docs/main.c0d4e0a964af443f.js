"use strict";
(self.webpackChunkmy_digital_cv = self.webpackChunkmy_digital_cv || []).push([
  [179],
  {
    29: () => {
      function nr(e) {
        return "function" == typeof e;
      }
      let Oi = !1;
      const It = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(e) {
          if (e) {
            const t = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                t.stack
            );
          } else
            Oi &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          Oi = e;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return Oi;
        },
      };
      function Fn(e) {
        setTimeout(() => {
          throw e;
        }, 0);
      }
      const to = {
          closed: !0,
          next(e) {},
          error(e) {
            if (It.useDeprecatedSynchronousErrorHandling) throw e;
            Fn(e);
          },
          complete() {},
        },
        nh = Array.isArray || ((e) => e && "number" == typeof e.length);
      function rh(e) {
        return null !== e && "object" == typeof e;
      }
      const no = (() => {
        function e(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((n, r) => `${r + 1}) ${n.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = t),
            this
          );
        }
        return (e.prototype = Object.create(Error.prototype)), e;
      })();
      class De {
        constructor(t) {
          (this.closed = !1),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
        }
        unsubscribe() {
          let t;
          if (this.closed) return;
          let {
            _parentOrParents: n,
            _ctorUnsubscribe: r,
            _unsubscribe: i,
            _subscriptions: s,
          } = this;
          if (
            ((this.closed = !0),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            n instanceof De)
          )
            n.remove(this);
          else if (null !== n)
            for (let o = 0; o < n.length; ++o) n[o].remove(this);
          if (nr(i)) {
            r && (this._unsubscribe = void 0);
            try {
              i.call(this);
            } catch (o) {
              t = o instanceof no ? ih(o.errors) : [o];
            }
          }
          if (nh(s)) {
            let o = -1,
              a = s.length;
            for (; ++o < a; ) {
              const l = s[o];
              if (rh(l))
                try {
                  l.unsubscribe();
                } catch (u) {
                  (t = t || []),
                    u instanceof no ? (t = t.concat(ih(u.errors))) : t.push(u);
                }
            }
          }
          if (t) throw new no(t);
        }
        add(t) {
          let n = t;
          if (!t) return De.EMPTY;
          switch (typeof t) {
            case "function":
              n = new De(t);
            case "object":
              if (n === this || n.closed || "function" != typeof n.unsubscribe)
                return n;
              if (this.closed) return n.unsubscribe(), n;
              if (!(n instanceof De)) {
                const s = n;
                (n = new De()), (n._subscriptions = [s]);
              }
              break;
            default:
              throw new Error(
                "unrecognized teardown " + t + " added to Subscription."
              );
          }
          let { _parentOrParents: r } = n;
          if (null === r) n._parentOrParents = this;
          else if (r instanceof De) {
            if (r === this) return n;
            n._parentOrParents = [r, this];
          } else {
            if (-1 !== r.indexOf(this)) return n;
            r.push(this);
          }
          const i = this._subscriptions;
          return null === i ? (this._subscriptions = [n]) : i.push(n), n;
        }
        remove(t) {
          const n = this._subscriptions;
          if (n) {
            const r = n.indexOf(t);
            -1 !== r && n.splice(r, 1);
          }
        }
      }
      var e;
      function ih(e) {
        return e.reduce((t, n) => t.concat(n instanceof no ? n.errors : n), []);
      }
      De.EMPTY = (((e = new De()).closed = !0), e);
      const ro =
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random();
      class fe extends De {
        constructor(t, n, r) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = to;
              break;
            case 1:
              if (!t) {
                this.destination = to;
                break;
              }
              if ("object" == typeof t) {
                t instanceof fe
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new sh(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new sh(this, t, n, r));
          }
        }
        [ro]() {
          return this;
        }
        static create(t, n, r) {
          const i = new fe(t, n, r);
          return (i.syncErrorThrowable = !1), i;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class sh extends fe {
        constructor(t, n, r, i) {
          super(), (this._parentSubscriber = t);
          let s,
            o = this;
          nr(n)
            ? (s = n)
            : n &&
              ((s = n.next),
              (r = n.error),
              (i = n.complete),
              n !== to &&
                ((o = Object.create(n)),
                nr(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = s),
            (this._error = r),
            (this._complete = i);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: n } = this;
            It.useDeprecatedSynchronousErrorHandling && n.syncErrorThrowable
              ? this.__tryOrSetError(n, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: n } = this,
              { useDeprecatedSynchronousErrorHandling: r } = It;
            if (this._error)
              r && n.syncErrorThrowable
                ? (this.__tryOrSetError(n, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (n.syncErrorThrowable)
              r ? ((n.syncErrorValue = t), (n.syncErrorThrown = !0)) : Fn(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), r)) throw t;
              Fn(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const n = () => this._complete.call(this._context);
              It.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, n), this.unsubscribe())
                : (this.__tryOrUnsub(n), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, n) {
          try {
            t.call(this._context, n);
          } catch (r) {
            if ((this.unsubscribe(), It.useDeprecatedSynchronousErrorHandling))
              throw r;
            Fn(r);
          }
        }
        __tryOrSetError(t, n, r) {
          if (!It.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            n.call(this._context, r);
          } catch (i) {
            return It.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = i), (t.syncErrorThrown = !0), !0)
              : (Fn(i), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }
      }
      const Fi =
        ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function io(e) {
        return e;
      }
      function oh(e) {
        return 0 === e.length
          ? io
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, i) => i(r), n);
            };
      }
      let Ce = (() => {
        class e {
          constructor(n) {
            (this._isScalar = !1), n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, i) {
            const { operator: s } = this,
              o = (function uw(e, t, n) {
                if (e) {
                  if (e instanceof fe) return e;
                  if (e[ro]) return e[ro]();
                }
                return e || t || n ? new fe(e, t, n) : new fe(to);
              })(n, r, i);
            if (
              (o.add(
                s
                  ? s.call(o, this.source)
                  : this.source ||
                    (It.useDeprecatedSynchronousErrorHandling &&
                      !o.syncErrorThrowable)
                  ? this._subscribe(o)
                  : this._trySubscribe(o)
              ),
              It.useDeprecatedSynchronousErrorHandling &&
                o.syncErrorThrowable &&
                ((o.syncErrorThrowable = !1), o.syncErrorThrown))
            )
              throw o.syncErrorValue;
            return o;
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              It.useDeprecatedSynchronousErrorHandling &&
                ((n.syncErrorThrown = !0), (n.syncErrorValue = r)),
                (function lw(e) {
                  for (; e; ) {
                    const { closed: t, destination: n, isStopped: r } = e;
                    if (t || r) return !1;
                    e = n && n instanceof fe ? n : null;
                  }
                  return !0;
                })(n)
                  ? n.error(r)
                  : console.warn(r);
            }
          }
          forEach(n, r) {
            return new (r = ah(r))((i, s) => {
              let o;
              o = this.subscribe(
                (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    s(l), o && o.unsubscribe();
                  }
                },
                s,
                i
              );
            });
          }
          _subscribe(n) {
            const { source: r } = this;
            return r && r.subscribe(n);
          }
          [Fi]() {
            return this;
          }
          pipe(...n) {
            return 0 === n.length ? this : oh(n)(this);
          }
          toPromise(n) {
            return new (n = ah(n))((r, i) => {
              let s;
              this.subscribe(
                (o) => (s = o),
                (o) => i(o),
                () => r(s)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function ah(e) {
        if ((e || (e = It.Promise || Promise), !e))
          throw new Error("no Promise impl found");
        return e;
      }
      const xr = (() => {
        function e() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (e.prototype = Object.create(Error.prototype)), e;
      })();
      class dw extends De {
        constructor(t, n) {
          super(),
            (this.subject = t),
            (this.subscriber = n),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            n = t.observers;
          if (
            ((this.subject = null),
            !n || 0 === n.length || t.isStopped || t.closed)
          )
            return;
          const r = n.indexOf(this.subscriber);
          -1 !== r && n.splice(r, 1);
        }
      }
      class lh extends fe {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let $t = (() => {
        class e extends Ce {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [ro]() {
            return new lh(this);
          }
          lift(n) {
            const r = new uh(this, this);
            return (r.operator = n), r;
          }
          next(n) {
            if (this.closed) throw new xr();
            if (!this.isStopped) {
              const { observers: r } = this,
                i = r.length,
                s = r.slice();
              for (let o = 0; o < i; o++) s[o].next(n);
            }
          }
          error(n) {
            if (this.closed) throw new xr();
            (this.hasError = !0), (this.thrownError = n), (this.isStopped = !0);
            const { observers: r } = this,
              i = r.length,
              s = r.slice();
            for (let o = 0; o < i; o++) s[o].error(n);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new xr();
            this.isStopped = !0;
            const { observers: n } = this,
              r = n.length,
              i = n.slice();
            for (let s = 0; s < r; s++) i[s].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(n) {
            if (this.closed) throw new xr();
            return super._trySubscribe(n);
          }
          _subscribe(n) {
            if (this.closed) throw new xr();
            return this.hasError
              ? (n.error(this.thrownError), De.EMPTY)
              : this.isStopped
              ? (n.complete(), De.EMPTY)
              : (this.observers.push(n), new dw(this, n));
          }
          asObservable() {
            const n = new Ce();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new uh(t, n)), e;
      })();
      class uh extends $t {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          const { destination: n } = this;
          n && n.next && n.next(t);
        }
        error(t) {
          const { destination: n } = this;
          n && n.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: n } = this;
          return n ? this.source.subscribe(t) : De.EMPTY;
        }
      }
      function so(e) {
        return e && "function" == typeof e.schedule;
      }
      function J(e, t) {
        return function (r) {
          if ("function" != typeof e)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return r.lift(new fw(e, t));
        };
      }
      class fw {
        constructor(t, n) {
          (this.project = t), (this.thisArg = n);
        }
        call(t, n) {
          return n.subscribe(new hw(t, this.project, this.thisArg));
        }
      }
      class hw extends fe {
        constructor(t, n, r) {
          super(t),
            (this.project = n),
            (this.count = 0),
            (this.thisArg = r || this);
        }
        _next(t) {
          let n;
          try {
            n = this.project.call(this.thisArg, t, this.count++);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.destination.next(n);
        }
      }
      const ch = (e) => (t) => {
          for (let n = 0, r = e.length; n < r && !t.closed; n++) t.next(e[n]);
          t.complete();
        },
        oo = (function gw() {
          return "function" == typeof Symbol && Symbol.iterator
            ? Symbol.iterator
            : "@@iterator";
        })(),
        dh = (e) => e && "number" == typeof e.length && "function" != typeof e;
      function fh(e) {
        return (
          !!e && "function" != typeof e.subscribe && "function" == typeof e.then
        );
      }
      const Ll = (e) => {
        if (e && "function" == typeof e[Fi])
          return ((e) => (t) => {
            const n = e[Fi]();
            if ("function" != typeof n.subscribe)
              throw new TypeError(
                "Provided object does not correctly implement Symbol.observable"
              );
            return n.subscribe(t);
          })(e);
        if (dh(e)) return ch(e);
        if (fh(e))
          return ((e) => (t) => (
            e
              .then(
                (n) => {
                  t.closed || (t.next(n), t.complete());
                },
                (n) => t.error(n)
              )
              .then(null, Fn),
            t
          ))(e);
        if (e && "function" == typeof e[oo])
          return ((e) => (t) => {
            const n = e[oo]();
            for (;;) {
              let r;
              try {
                r = n.next();
              } catch (i) {
                return t.error(i), t;
              }
              if (r.done) {
                t.complete();
                break;
              }
              if ((t.next(r.value), t.closed)) break;
            }
            return (
              "function" == typeof n.return &&
                t.add(() => {
                  n.return && n.return();
                }),
              t
            );
          })(e);
        {
          const n = `You provided ${
            rh(e) ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`;
          throw new TypeError(n);
        }
      };
      function kl(e, t) {
        return new Ce((n) => {
          const r = new De();
          let i = 0;
          return (
            r.add(
              t.schedule(function () {
                i !== e.length
                  ? (n.next(e[i++]), n.closed || r.add(this.schedule()))
                  : n.complete();
              })
            ),
            r
          );
        });
      }
      function Ve(e, t) {
        return t
          ? (function Cw(e, t) {
              if (null != e) {
                if (
                  (function Ew(e) {
                    return e && "function" == typeof e[Fi];
                  })(e)
                )
                  return (function vw(e, t) {
                    return new Ce((n) => {
                      const r = new De();
                      return (
                        r.add(
                          t.schedule(() => {
                            const i = e[Fi]();
                            r.add(
                              i.subscribe({
                                next(s) {
                                  r.add(t.schedule(() => n.next(s)));
                                },
                                error(s) {
                                  r.add(t.schedule(() => n.error(s)));
                                },
                                complete() {
                                  r.add(t.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    });
                  })(e, t);
                if (fh(e))
                  return (function _w(e, t) {
                    return new Ce((n) => {
                      const r = new De();
                      return (
                        r.add(
                          t.schedule(() =>
                            e.then(
                              (i) => {
                                r.add(
                                  t.schedule(() => {
                                    n.next(i),
                                      r.add(t.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (i) => {
                                r.add(t.schedule(() => n.error(i)));
                              }
                            )
                          )
                        ),
                        r
                      );
                    });
                  })(e, t);
                if (dh(e)) return kl(e, t);
                if (
                  (function ww(e) {
                    return e && "function" == typeof e[oo];
                  })(e) ||
                  "string" == typeof e
                )
                  return (function Dw(e, t) {
                    if (!e) throw new Error("Iterable cannot be null");
                    return new Ce((n) => {
                      const r = new De();
                      let i;
                      return (
                        r.add(() => {
                          i && "function" == typeof i.return && i.return();
                        }),
                        r.add(
                          t.schedule(() => {
                            (i = e[oo]()),
                              r.add(
                                t.schedule(function () {
                                  if (n.closed) return;
                                  let s, o;
                                  try {
                                    const a = i.next();
                                    (s = a.value), (o = a.done);
                                  } catch (a) {
                                    return void n.error(a);
                                  }
                                  o
                                    ? n.complete()
                                    : (n.next(s), this.schedule());
                                })
                              );
                          })
                        ),
                        r
                      );
                    });
                  })(e, t);
              }
              throw new TypeError(
                ((null !== e && typeof e) || e) + " is not observable"
              );
            })(e, t)
          : e instanceof Ce
          ? e
          : new Ce(Ll(e));
      }
      class ao extends fe {
        constructor(t) {
          super(), (this.parent = t);
        }
        _next(t) {
          this.parent.notifyNext(t);
        }
        _error(t) {
          this.parent.notifyError(t), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class lo extends fe {
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyError(t) {
          this.destination.error(t);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      function uo(e, t) {
        if (t.closed) return;
        if (e instanceof Ce) return e.subscribe(t);
        let n;
        try {
          n = Ll(e)(t);
        } catch (r) {
          t.error(r);
        }
        return n;
      }
      function Ue(e, t, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof t
          ? (r) =>
              r.pipe(
                Ue((i, s) => Ve(e(i, s)).pipe(J((o, a) => t(i, o, s, a))), n)
              )
          : ("number" == typeof t && (n = t), (r) => r.lift(new bw(e, n)));
      }
      class bw {
        constructor(t, n = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = n);
        }
        call(t, n) {
          return n.subscribe(new Sw(t, this.project, this.concurrent));
        }
      }
      class Sw extends lo {
        constructor(t, n, r = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = n),
            (this.concurrent = r),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }
        _tryNext(t) {
          let n;
          const r = this.index++;
          try {
            n = this.project(t, r);
          } catch (i) {
            return void this.destination.error(i);
          }
          this.active++, this._innerSub(n);
        }
        _innerSub(t) {
          const n = new ao(this),
            r = this.destination;
          r.add(n);
          const i = uo(t, n);
          i !== n && r.add(i);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyComplete() {
          const t = this.buffer;
          this.active--,
            t.length > 0
              ? this._next(t.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function Pr(e = Number.POSITIVE_INFINITY) {
        return Ue(io, e);
      }
      function Vl(e, t) {
        return t ? kl(e, t) : new Ce(ch(e));
      }
      function co() {
        return function (t) {
          return t.lift(new Iw(t));
        };
      }
      class Iw {
        constructor(t) {
          this.connectable = t;
        }
        call(t, n) {
          const { connectable: r } = this;
          r._refCount++;
          const i = new Mw(t, r),
            s = n.subscribe(i);
          return i.closed || (i.connection = r.connect()), s;
        }
      }
      class Mw extends fe {
        constructor(t, n) {
          super(t), (this.connectable = n);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const n = t._refCount;
          if (n <= 0) return void (this.connection = null);
          if (((t._refCount = n - 1), n > 1))
            return void (this.connection = null);
          const { connection: r } = this,
            i = t._connection;
          (this.connection = null), i && (!r || i === r) && i.unsubscribe();
        }
      }
      class Bl extends Ce {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new De()),
              t.add(this.source.subscribe(new Rw(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = De.EMPTY))),
            t
          );
        }
        refCount() {
          return co()(this);
        }
      }
      const Aw = (() => {
        const e = Bl.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: e._subscribe },
          _isComplete: { value: e._isComplete, writable: !0 },
          getSubject: { value: e.getSubject },
          connect: { value: e.connect },
          refCount: { value: e.refCount },
        };
      })();
      class Rw extends lh {
        constructor(t, n) {
          super(t), (this.connectable = n);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const n = t._connection;
            (t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              n && n.unsubscribe();
          }
        }
      }
      class Pw {
        constructor(t, n) {
          (this.subjectFactory = t), (this.selector = n);
        }
        call(t, n) {
          const { selector: r } = this,
            i = this.subjectFactory(),
            s = r(i).subscribe(t);
          return s.add(n.subscribe(i)), s;
        }
      }
      function Ow() {
        return new $t();
      }
      function se(e) {
        for (let t in e) if (e[t] === se) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function oe(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(oe).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function $l(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const Lw = se({ __forward_ref__: se });
      function Ul(e) {
        return (
          (e.__forward_ref__ = Ul),
          (e.toString = function () {
            return oe(this());
          }),
          e
        );
      }
      function L(e) {
        return (function Hl(e) {
          return (
            "function" == typeof e &&
            e.hasOwnProperty(Lw) &&
            e.__forward_ref__ === Ul
          );
        })(e)
          ? e()
          : e;
      }
      class D extends Error {
        constructor(t, n) {
          super(
            (function fo(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function j(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function ho(e, t) {
        throw new D(-201, !1);
      }
      function dt(e, t) {
        null == e &&
          (function ne(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function V(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function He(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function po(e) {
        return hh(e, go) || hh(e, gh);
      }
      function hh(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function ph(e) {
        return e && (e.hasOwnProperty(zl) || e.hasOwnProperty(Ww))
          ? e[zl]
          : null;
      }
      const go = se({ ɵprov: se }),
        zl = se({ ɵinj: se }),
        gh = se({ ngInjectableDef: se }),
        Ww = se({ ngInjectorDef: se });
      var x = (() => (
        ((x = x || {})[(x.Default = 0)] = "Default"),
        (x[(x.Host = 1)] = "Host"),
        (x[(x.Self = 2)] = "Self"),
        (x[(x.SkipSelf = 4)] = "SkipSelf"),
        (x[(x.Optional = 8)] = "Optional"),
        x
      ))();
      let Wl;
      function Mt(e) {
        const t = Wl;
        return (Wl = e), t;
      }
      function mh(e, t, n) {
        const r = po(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & x.Optional
          ? null
          : void 0 !== t
          ? t
          : void ho(oe(e));
      }
      function Ln(e) {
        return { toString: e }.toString();
      }
      var Ut = (() => (
          ((Ut = Ut || {})[(Ut.OnPush = 0)] = "OnPush"),
          (Ut[(Ut.Default = 1)] = "Default"),
          Ut
        ))(),
        Ht = (() => (
          (function (e) {
            (e[(e.Emulated = 0)] = "Emulated"),
              (e[(e.None = 2)] = "None"),
              (e[(e.ShadowDom = 3)] = "ShadowDom");
          })(Ht || (Ht = {})),
          Ht
        ))();
      const le = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Or = {},
        te = [],
        mo = se({ ɵcmp: se }),
        Gl = se({ ɵdir: se }),
        ql = se({ ɵpipe: se }),
        yh = se({ ɵmod: se }),
        yn = se({ ɵfac: se }),
        Li = se({ __NG_ELEMENT_ID__: se });
      let qw = 0;
      function ze(e) {
        return Ln(() => {
          const n = !0 === e.standalone,
            r = {},
            i = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === Ut.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: n,
              dependencies: (n && e.dependencies) || null,
              getStandaloneInjector: null,
              selectors: e.selectors || te,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || Ht.Emulated,
              id: "c" + qw++,
              styles: e.styles || te,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            s = e.dependencies,
            o = e.features;
          return (
            (i.inputs = Dh(e.inputs, r)),
            (i.outputs = Dh(e.outputs)),
            o && o.forEach((a) => a(i)),
            (i.directiveDefs = s
              ? () => ("function" == typeof s ? s() : s).map(vh).filter(_h)
              : null),
            (i.pipeDefs = s
              ? () => ("function" == typeof s ? s() : s).map(et).filter(_h)
              : null),
            i
          );
        });
      }
      function vh(e) {
        return re(e) || Je(e);
      }
      function _h(e) {
        return null !== e;
      }
      function Ze(e) {
        return Ln(() => ({
          type: e.type,
          bootstrap: e.bootstrap || te,
          declarations: e.declarations || te,
          imports: e.imports || te,
          exports: e.exports || te,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Dh(e, t) {
        if (null == e) return Or;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let i = e[r],
              s = i;
            Array.isArray(i) && ((s = i[1]), (i = i[0])),
              (n[i] = r),
              t && (t[i] = s);
          }
        return n;
      }
      const Be = ze;
      function Xe(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function re(e) {
        return e[mo] || null;
      }
      function Je(e) {
        return e[Gl] || null;
      }
      function et(e) {
        return e[ql] || null;
      }
      function ft(e, t) {
        const n = e[yh] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${oe(e)} does not have '\u0275mod' property.`);
        return n;
      }
      const H = 11;
      function at(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function Wt(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function Yl(e) {
        return 0 != (8 & e.flags);
      }
      function Do(e) {
        return 2 == (2 & e.flags);
      }
      function Eo(e) {
        return 1 == (1 & e.flags);
      }
      function Gt(e) {
        return null !== e.template;
      }
      function Jw(e) {
        return 0 != (256 & e[2]);
      }
      function ar(e, t) {
        return e.hasOwnProperty(yn) ? e[yn] : null;
      }
      class nC {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function kn() {
        return Ch;
      }
      function Ch(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = iC), rC;
      }
      function rC() {
        const e = Sh(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === Or) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function iC(e, t, n, r) {
        const i =
            Sh(e) ||
            (function sC(e, t) {
              return (e[bh] = t);
            })(e, { previous: Or, current: null }),
          s = i.current || (i.current = {}),
          o = i.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (s[a] = new nC(l && l.currentValue, t, o === Or)), (e[r] = t);
      }
      kn.ngInherit = !0;
      const bh = "__ngSimpleChanges__";
      function Sh(e) {
        return e[bh] || null;
      }
      function Me(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function wo(e, t) {
        return Me(t[e]);
      }
      function pt(e, t) {
        return Me(t[e.index]);
      }
      function tu(e, t) {
        return e.data[t];
      }
      function Br(e, t) {
        return e[t];
      }
      function gt(e, t) {
        const n = t[e];
        return at(n) ? n : n[0];
      }
      function Co(e) {
        return 64 == (64 & e[2]);
      }
      function Vn(e, t) {
        return null == t ? null : e[t];
      }
      function Th(e) {
        e[18] = 0;
      }
      function nu(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const B = { lFrame: Lh(null), bindingsEnabled: !0 };
      function Mh() {
        return B.bindingsEnabled;
      }
      function v() {
        return B.lFrame.lView;
      }
      function Y() {
        return B.lFrame.tView;
      }
      function Ne() {
        let e = Ah();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Ah() {
        return B.lFrame.currentTNode;
      }
      function sn(e, t) {
        const n = B.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function ru() {
        return B.lFrame.isParent;
      }
      function iu() {
        B.lFrame.isParent = !1;
      }
      function tt() {
        const e = B.lFrame;
        let t = e.bindingRootIndex;
        return (
          -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t
        );
      }
      function jr() {
        return B.lFrame.bindingIndex++;
      }
      function _n(e) {
        const t = B.lFrame,
          n = t.bindingIndex;
        return (t.bindingIndex = t.bindingIndex + e), n;
      }
      function wC(e, t) {
        const n = B.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), su(t);
      }
      function su(e) {
        B.lFrame.currentDirectiveIndex = e;
      }
      function Ph() {
        return B.lFrame.currentQueryIndex;
      }
      function au(e) {
        B.lFrame.currentQueryIndex = e;
      }
      function bC(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function Oh(e, t, n) {
        if (n & x.SkipSelf) {
          let i = t,
            s = e;
          for (
            ;
            !((i = i.parent),
            null !== i ||
              n & x.Host ||
              ((i = bC(s)), null === i || ((s = s[15]), 10 & i.type)));

          );
          if (null === i) return !1;
          (t = i), (e = s);
        }
        const r = (B.lFrame = Fh());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function lu(e) {
        const t = Fh(),
          n = e[1];
        (B.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Fh() {
        const e = B.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Lh(e) : t;
      }
      function Lh(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function kh() {
        const e = B.lFrame;
        return (
          (B.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Vh = kh;
      function uu() {
        const e = kh();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function nt() {
        return B.lFrame.selectedIndex;
      }
      function Bn(e) {
        B.lFrame.selectedIndex = e;
      }
      function bo(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const s = e.data[n].type.prototype,
            {
              ngAfterContentInit: o,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c,
            } = s;
          o && (e.contentHooks || (e.contentHooks = [])).push(-n, o),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            l && (e.viewHooks || (e.viewHooks = [])).push(-n, l),
            u &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, u),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, u)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
        }
      }
      function So(e, t, n) {
        Bh(e, t, 3, n);
      }
      function To(e, t, n, r) {
        (3 & e[2]) === n && Bh(e, t, n, r);
      }
      function cu(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function Bh(e, t, n, r) {
        const s = r ?? -1,
          o = t.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & e[18] : 0; l < o; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != r && a >= r)) break;
          } else
            t[l] < 0 && (e[18] += 65536),
              (a < s || -1 == s) &&
                (PC(e, n, t, l), (e[18] = (4294901760 & e[18]) + l + 2)),
              l++;
      }
      function PC(e, t, n, r) {
        const i = n[r] < 0,
          s = n[r + 1],
          a = e[i ? -n[r] : n[r]];
        if (i) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              s.call(a);
            } finally {
            }
          }
        } else
          try {
            s.call(a);
          } finally {
          }
      }
      class Ui {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Io(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const i = n[r];
          if ("number" == typeof i) {
            if (0 !== i) break;
            r++;
            const s = n[r++],
              o = n[r++],
              a = n[r++];
            e.setAttribute(t, o, a, s);
          } else {
            const s = i,
              o = n[++r];
            $h(s) ? e.setProperty(t, s, o) : e.setAttribute(t, s, o), r++;
          }
        }
        return r;
      }
      function jh(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function $h(e) {
        return 64 === e.charCodeAt(0);
      }
      function Mo(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const i = t[r];
              "number" == typeof i
                ? (n = i)
                : 0 === n ||
                  Uh(e, n, i, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Uh(e, t, n, r, i) {
        let s = 0,
          o = e.length;
        if (-1 === t) o = -1;
        else
          for (; s < e.length; ) {
            const a = e[s++];
            if ("number" == typeof a) {
              if (a === t) {
                o = -1;
                break;
              }
              if (a > t) {
                o = s - 1;
                break;
              }
            }
          }
        for (; s < e.length; ) {
          const a = e[s];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== i && (e[s + 1] = i));
            if (r === e[s + 1]) return void (e[s + 2] = i);
          }
          s++, null !== r && s++, null !== i && s++;
        }
        -1 !== o && (e.splice(o, 0, t), (s = o + 1)),
          e.splice(s++, 0, n),
          null !== r && e.splice(s++, 0, r),
          null !== i && e.splice(s++, 0, i);
      }
      function Hh(e) {
        return -1 !== e;
      }
      function $r(e) {
        return 32767 & e;
      }
      function Ur(e, t) {
        let n = (function VC(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let fu = !0;
      function Ao(e) {
        const t = fu;
        return (fu = e), t;
      }
      let BC = 0;
      const on = {};
      function zi(e, t) {
        const n = pu(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          hu(r.data, e),
          hu(t, null),
          hu(r.blueprint, null));
        const i = Ro(e, t),
          s = e.injectorIndex;
        if (Hh(i)) {
          const o = $r(i),
            a = Ur(i, t),
            l = a[1].data;
          for (let u = 0; u < 8; u++) t[s + u] = a[o + u] | l[o + u];
        }
        return (t[s + 8] = i), s;
      }
      function hu(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function pu(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Ro(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          i = t;
        for (; null !== i; ) {
          if (((r = Xh(i)), null === r)) return -1;
          if ((n++, (i = i[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function No(e, t, n) {
        !(function jC(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Li) && (r = n[Li]),
            null == r && (r = n[Li] = BC++);
          const i = 255 & r;
          t.data[e + (i >> 5)] |= 1 << i;
        })(e, t, n);
      }
      function Gh(e, t, n) {
        if (n & x.Optional || void 0 !== e) return e;
        ho();
      }
      function qh(e, t, n, r) {
        if (
          (n & x.Optional && void 0 === r && (r = null),
          0 == (n & (x.Self | x.Host)))
        ) {
          const i = e[9],
            s = Mt(void 0);
          try {
            return i ? i.get(t, r, n & x.Optional) : mh(t, r, n & x.Optional);
          } finally {
            Mt(s);
          }
        }
        return Gh(r, 0, n);
      }
      function Kh(e, t, n, r = x.Default, i) {
        if (null !== e) {
          if (1024 & t[2]) {
            const o = (function GC(e, t, n, r, i) {
              let s = e,
                o = t;
              for (
                ;
                null !== s && null !== o && 1024 & o[2] && !(256 & o[2]);

              ) {
                const a = Qh(s, o, n, r | x.Self, on);
                if (a !== on) return a;
                let l = s.parent;
                if (!l) {
                  const u = o[21];
                  if (u) {
                    const c = u.get(n, on, r);
                    if (c !== on) return c;
                  }
                  (l = Xh(o)), (o = o[15]);
                }
                s = l;
              }
              return i;
            })(e, t, n, r, on);
            if (o !== on) return o;
          }
          const s = Qh(e, t, n, r, on);
          if (s !== on) return s;
        }
        return qh(t, n, r, i);
      }
      function Qh(e, t, n, r, i) {
        const s = (function HC(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Li) ? e[Li] : void 0;
          return "number" == typeof t ? (t >= 0 ? 255 & t : zC) : t;
        })(n);
        if ("function" == typeof s) {
          if (!Oh(t, e, r)) return r & x.Host ? Gh(i, 0, r) : qh(t, n, r, i);
          try {
            const o = s(r);
            if (null != o || r & x.Optional) return o;
            ho();
          } finally {
            Vh();
          }
        } else if ("number" == typeof s) {
          let o = null,
            a = pu(e, t),
            l = -1,
            u = r & x.Host ? t[16][6] : null;
          for (
            (-1 === a || r & x.SkipSelf) &&
            ((l = -1 === a ? Ro(e, t) : t[a + 8]),
            -1 !== l && Zh(r, !1)
              ? ((o = t[1]), (a = $r(l)), (t = Ur(l, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[1];
            if (Yh(s, a, c.data)) {
              const d = UC(a, t, n, o, r, u);
              if (d !== on) return d;
            }
            (l = t[a + 8]),
              -1 !== l && Zh(r, t[1].data[a + 8] === u) && Yh(s, a, t)
                ? ((o = c), (a = $r(l)), (t = Ur(l, t)))
                : (a = -1);
          }
        }
        return i;
      }
      function UC(e, t, n, r, i, s) {
        const o = t[1],
          a = o.data[e + 8],
          c = xo(
            a,
            o,
            n,
            null == r ? Do(a) && fu : r != o && 0 != (3 & a.type),
            i & x.Host && s === a
          );
        return null !== c ? Wi(t, o, c, a) : on;
      }
      function xo(e, t, n, r, i) {
        const s = e.providerIndexes,
          o = t.data,
          a = 1048575 & s,
          l = e.directiveStart,
          c = s >> 20,
          f = i ? a + c : e.directiveEnd;
        for (let h = r ? a : a + c; h < f; h++) {
          const p = o[h];
          if ((h < l && n === p) || (h >= l && p.type === n)) return h;
        }
        if (i) {
          const h = o[l];
          if (h && Gt(h) && h.type === n) return l;
        }
        return null;
      }
      function Wi(e, t, n, r) {
        let i = e[n];
        const s = t.data;
        if (
          (function OC(e) {
            return e instanceof Ui;
          })(i)
        ) {
          const o = i;
          o.resolving &&
            (function kw(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new D(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function ee(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : j(e);
              })(s[n])
            );
          const a = Ao(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? Mt(o.injectImpl) : null;
          Oh(e, r, x.Default);
          try {
            (i = e[n] = o.factory(void 0, s, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function xC(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: i,
                    ngDoCheck: s,
                  } = t.type.prototype;
                  if (r) {
                    const o = Ch(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, o),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, o);
                  }
                  i &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, i),
                    s &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s));
                })(n, s[n], t);
          } finally {
            null !== l && Mt(l), Ao(a), (o.resolving = !1), Vh();
          }
        }
        return i;
      }
      function Yh(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function Zh(e, t) {
        return !(e & x.Self || (e & x.Host && t));
      }
      class Hr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Kh(this._tNode, this._lView, t, r, n);
        }
      }
      function zC() {
        return new Hr(Ne(), v());
      }
      function Xh(e) {
        const t = e[1],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[6] : null;
      }
      const Wr = "__parameters__";
      function qr(e, t, n) {
        return Ln(() => {
          const r = (function mu(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const i in r) this[i] = r[i];
              }
            };
          })(t);
          function i(...s) {
            if (this instanceof i) return r.apply(this, s), this;
            const o = new i(...s);
            return (a.annotation = o), a;
            function a(l, u, c) {
              const d = l.hasOwnProperty(Wr)
                ? l[Wr]
                : Object.defineProperty(l, Wr, { value: [] })[Wr];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(o), l;
            }
          }
          return (
            n && (i.prototype = Object.create(n.prototype)),
            (i.prototype.ngMetadataName = e),
            (i.annotationCls = i),
            i
          );
        });
      }
      class k {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = V({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function mt(e, t) {
        void 0 === t && (t = e);
        for (let n = 0; n < e.length; n++) {
          let r = e[n];
          Array.isArray(r)
            ? (t === e && (t = e.slice(0, n)), mt(r, t))
            : t !== e && t.push(r);
        }
        return t;
      }
      function Dn(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Dn(n, t) : t(n)));
      }
      function ep(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Po(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function Qi(e, t) {
        const n = [];
        for (let r = 0; r < e; r++) n.push(t);
        return n;
      }
      function yt(e, t, n) {
        let r = Kr(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function YC(e, t, n, r) {
                let i = e.length;
                if (i == t) e.push(n, r);
                else if (1 === i) e.push(r, e[0]), (e[0] = n);
                else {
                  for (i--, e.push(e[i - 1], e[i]); i > t; )
                    (e[i] = e[i - 2]), i--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function vu(e, t) {
        const n = Kr(e, t);
        if (n >= 0) return e[1 | n];
      }
      function Kr(e, t) {
        return (function rp(e, t, n) {
          let r = 0,
            i = e.length >> n;
          for (; i !== r; ) {
            const s = r + ((i - r) >> 1),
              o = e[s << n];
            if (t === o) return s << n;
            o > t ? (i = s) : (r = s + 1);
          }
          return ~(i << n);
        })(e, t, 1);
      }
      const Yi = {},
        Du = "__NG_DI_FLAG__",
        Fo = "ngTempTokenPath",
        ib = /\n/gm,
        ip = "__source";
      let Zi;
      function Qr(e) {
        const t = Zi;
        return (Zi = e), t;
      }
      function ob(e, t = x.Default) {
        if (void 0 === Zi) throw new D(-203, !1);
        return null === Zi
          ? mh(e, void 0, t)
          : Zi.get(e, t & x.Optional ? null : void 0, t);
      }
      function I(e, t = x.Default) {
        return (
          (function Gw() {
            return Wl;
          })() || ob
        )(L(e), t);
      }
      function be(e, t = x.Default) {
        return (
          "number" != typeof t &&
            (t =
              0 |
              (t.optional && 8) |
              (t.host && 1) |
              (t.self && 2) |
              (t.skipSelf && 4)),
          I(e, t)
        );
      }
      function Eu(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = L(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new D(900, !1);
            let i,
              s = x.Default;
            for (let o = 0; o < r.length; o++) {
              const a = r[o],
                l = ab(a);
              "number" == typeof l
                ? -1 === l
                  ? (i = a.token)
                  : (s |= l)
                : (i = a);
            }
            t.push(I(i, s));
          } else t.push(I(r));
        }
        return t;
      }
      function Xi(e, t) {
        return (e[Du] = t), (e.prototype[Du] = t), e;
      }
      function ab(e) {
        return e[Du];
      }
      const Ji = Xi(qr("Optional"), 8),
        es = Xi(qr("SkipSelf"), 4);
      var lt = (() => (
        ((lt = lt || {})[(lt.Important = 1)] = "Important"),
        (lt[(lt.DashCase = 2)] = "DashCase"),
        lt
      ))();
      const Tu = new Map();
      let Sb = 0;
      const Mu = "__ngContext__";
      function qe(e, t) {
        at(t)
          ? ((e[Mu] = t[20]),
            (function Ib(e) {
              Tu.set(e[20], e);
            })(t))
          : (e[Mu] = t);
      }
      function Ru(e, t) {
        return undefined(e, t);
      }
      function is(e) {
        const t = e[3];
        return Wt(t) ? t[3] : t;
      }
      function Nu(e) {
        return Sp(e[13]);
      }
      function xu(e) {
        return Sp(e[4]);
      }
      function Sp(e) {
        for (; null !== e && !Wt(e); ) e = e[4];
        return e;
      }
      function Zr(e, t, n, r, i) {
        if (null != r) {
          let s,
            o = !1;
          Wt(r) ? (s = r) : at(r) && ((o = !0), (r = r[0]));
          const a = Me(r);
          0 === e && null !== n
            ? null == i
              ? Np(t, n, a)
              : lr(t, n, a, i || null, !0)
            : 1 === e && null !== n
            ? lr(t, n, a, i || null, !0)
            : 2 === e
            ? (function Bu(e, t, n) {
                const r = Vo(e, t);
                r &&
                  (function Qb(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, o)
            : 3 === e && t.destroyNode(a),
            null != s &&
              (function Xb(e, t, n, r, i) {
                const s = n[7];
                s !== Me(n) && Zr(t, e, r, s, i);
                for (let a = 10; a < n.length; a++) {
                  const l = n[a];
                  ss(l[1], l, e, t, r, s);
                }
              })(t, e, s, n, i);
        }
      }
      function Ou(e, t, n) {
        return e.createElement(t, n);
      }
      function Ip(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          i = t[3];
        512 & t[2] && ((t[2] &= -513), nu(i, -1)), n.splice(r, 1);
      }
      function Fu(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const i = r[17];
          null !== i && i !== e && Ip(i, r), t > 0 && (e[n - 1][4] = r[4]);
          const s = Po(e, 10 + t);
          !(function $b(e, t) {
            ss(e, t, t[H], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const o = s[19];
          null !== o && o.detachView(s[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -65);
        }
        return r;
      }
      function Mp(e, t) {
        if (!(128 & t[2])) {
          const n = t[H];
          n.destroyNode && ss(e, t, n, 3, null, null),
            (function zb(e) {
              let t = e[13];
              if (!t) return Lu(e[1], e);
              for (; t; ) {
                let n = null;
                if (at(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    at(t) && Lu(t[1], t), (t = t[3]);
                  null === t && (t = e), at(t) && Lu(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Lu(e, t) {
        if (!(128 & t[2])) {
          (t[2] &= -65),
            (t[2] |= 128),
            (function Kb(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const i = t[n[r]];
                  if (!(i instanceof Ui)) {
                    const s = n[r + 1];
                    if (Array.isArray(s))
                      for (let o = 0; o < s.length; o += 2) {
                        const a = i[s[o]],
                          l = s[o + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        s.call(i);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function qb(e, t) {
              const n = e.cleanup,
                r = t[7];
              let i = -1;
              if (null !== n)
                for (let s = 0; s < n.length - 1; s += 2)
                  if ("string" == typeof n[s]) {
                    const o = n[s + 1],
                      a = "function" == typeof o ? o(t) : Me(t[o]),
                      l = r[(i = n[s + 2])],
                      u = n[s + 3];
                    "boolean" == typeof u
                      ? a.removeEventListener(n[s], l, u)
                      : u >= 0
                      ? r[(i = u)]()
                      : r[(i = -u)].unsubscribe(),
                      (s += 2);
                  } else {
                    const o = r[(i = n[s + 1])];
                    n[s].call(o);
                  }
              if (null !== r) {
                for (let s = i + 1; s < r.length; s++) (0, r[s])();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && t[H].destroy();
          const n = t[17];
          if (null !== n && Wt(t[3])) {
            n !== t[3] && Ip(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
          !(function Mb(e) {
            Tu.delete(e[20]);
          })(t);
        }
      }
      function Ap(e, t, n) {
        return (function Rp(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const i = e.data[r.directiveStart].encapsulation;
            if (i === Ht.None || i === Ht.Emulated) return null;
          }
          return pt(r, n);
        })(e, t.parent, n);
      }
      function lr(e, t, n, r, i) {
        e.insertBefore(t, n, r, i);
      }
      function Np(e, t, n) {
        e.appendChild(t, n);
      }
      function xp(e, t, n, r, i) {
        null !== r ? lr(e, t, n, r, i) : Np(e, t, n);
      }
      function Vo(e, t) {
        return e.parentNode(t);
      }
      function Pp(e, t, n) {
        return Fp(e, t, n);
      }
      let $o,
        Hu,
        Uo,
        Fp = function Op(e, t, n) {
          return 40 & e.type ? pt(e, n) : null;
        };
      function Bo(e, t, n, r) {
        const i = Ap(e, r, t),
          s = t[H],
          a = Pp(r.parent || t[6], r, t);
        if (null != i)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) xp(s, i, n[l], a, !1);
          else xp(s, i, n, a, !1);
      }
      function jo(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return pt(t, e);
          if (4 & n) return Vu(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return jo(e, r);
            {
              const i = e[t.index];
              return Wt(i) ? Vu(-1, i) : Me(i);
            }
          }
          if (32 & n) return Ru(t, e)() || Me(e[t.index]);
          {
            const r = kp(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : jo(is(e[16]), r)
              : jo(e, t.next);
          }
        }
        return null;
      }
      function kp(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function Vu(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            i = r[1].firstChild;
          if (null !== i) return jo(r, i);
        }
        return t[7];
      }
      function ju(e, t, n, r, i, s, o) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (o && 0 === t && (a && qe(Me(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) ju(e, t, n.child, r, i, s, !1), Zr(t, e, i, a, s);
            else if (32 & l) {
              const u = Ru(n, r);
              let c;
              for (; (c = u()); ) Zr(t, e, i, c, s);
              Zr(t, e, i, a, s);
            } else 16 & l ? Vp(e, t, r, n, i, s) : Zr(t, e, i, a, s);
          n = o ? n.projectionNext : n.next;
        }
      }
      function ss(e, t, n, r, i, s) {
        ju(n, r, e.firstChild, t, i, s, !1);
      }
      function Vp(e, t, n, r, i, s) {
        const o = n[16],
          l = o[6].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) Zr(t, e, i, l[u], s);
        else ju(e, t, l, o[3], i, s, !0);
      }
      function Bp(e, t, n) {
        e.setAttribute(t, "style", n);
      }
      function $u(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function ur(e) {
        return (
          (function Uu() {
            if (void 0 === $o && (($o = null), le.trustedTypes))
              try {
                $o = le.trustedTypes.createPolicy("angular", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return $o;
          })()?.createHTML(e) || e
        );
      }
      function $p(e) {
        return (
          (function zu() {
            if (void 0 === Uo && ((Uo = null), le.trustedTypes))
              try {
                Uo = le.trustedTypes.createPolicy("angular#unsafe-bypass", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return Uo;
          })()?.createHTML(e) || e
        );
      }
      class cr {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      class iS extends cr {
        getTypeName() {
          return "HTML";
        }
      }
      class sS extends cr {
        getTypeName() {
          return "Style";
        }
      }
      class oS extends cr {
        getTypeName() {
          return "Script";
        }
      }
      class aS extends cr {
        getTypeName() {
          return "URL";
        }
      }
      class lS extends cr {
        getTypeName() {
          return "ResourceURL";
        }
      }
      function vt(e) {
        return e instanceof cr ? e.changingThisBreaksApplicationSecurity : e;
      }
      function an(e, t) {
        const n = (function uS(e) {
          return (e instanceof cr && e.getTypeName()) || null;
        })(e);
        if (null != n && n !== t) {
          if ("ResourceURL" === n && "URL" === t) return !0;
          throw new Error(
            `Required a safe ${t}, got a ${n} (see https://g.co/ng/security#xss)`
          );
        }
        return n === t;
      }
      class gS {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = "<body><remove></remove>" + t;
          try {
            const n = new window.DOMParser().parseFromString(
              ur(t),
              "text/html"
            ).body;
            return null === n
              ? this.inertDocumentHelper.getInertBodyElement(t)
              : (n.removeChild(n.firstChild), n);
          } catch {
            return null;
          }
        }
      }
      class mS {
        constructor(t) {
          if (
            ((this.defaultDoc = t),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                "sanitization-inert"
              )),
            null == this.inertDocument.body)
          ) {
            const n = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(n);
            const r = this.inertDocument.createElement("body");
            n.appendChild(r);
          }
        }
        getInertBodyElement(t) {
          const n = this.inertDocument.createElement("template");
          if ("content" in n) return (n.innerHTML = ur(t)), n;
          const r = this.inertDocument.createElement("body");
          return (
            (r.innerHTML = ur(t)),
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(r),
            r
          );
        }
        stripCustomNsAttrs(t) {
          const n = t.attributes;
          for (let i = n.length - 1; 0 < i; i--) {
            const o = n.item(i).name;
            ("xmlns:ns1" === o || 0 === o.indexOf("ns1:")) &&
              t.removeAttribute(o);
          }
          let r = t.firstChild;
          for (; r; )
            r.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(r),
              (r = r.nextSibling);
        }
      }
      const vS =
        /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
      function Ho(e) {
        return (e = String(e)).match(vS) ? e : "unsafe:" + e;
      }
      function En(e) {
        const t = {};
        for (const n of e.split(",")) t[n] = !0;
        return t;
      }
      function os(...e) {
        const t = {};
        for (const n of e)
          for (const r in n) n.hasOwnProperty(r) && (t[r] = !0);
        return t;
      }
      const Wp = En("area,br,col,hr,img,wbr"),
        Gp = En("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        qp = En("rp,rt"),
        Wu = os(
          Wp,
          os(
            Gp,
            En(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          os(
            qp,
            En(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          os(qp, Gp)
        ),
        Gu = En("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        Kp = os(
          Gu,
          En(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          En(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        _S = En("script,style,template");
      class DS {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let n = t.firstChild,
            r = !0;
          for (; n; )
            if (
              (n.nodeType === Node.ELEMENT_NODE
                ? (r = this.startElement(n))
                : n.nodeType === Node.TEXT_NODE
                ? this.chars(n.nodeValue)
                : (this.sanitizedSomething = !0),
              r && n.firstChild)
            )
              n = n.firstChild;
            else
              for (; n; ) {
                n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
                let i = this.checkClobberedElement(n, n.nextSibling);
                if (i) {
                  n = i;
                  break;
                }
                n = this.checkClobberedElement(n, n.parentNode);
              }
          return this.buf.join("");
        }
        startElement(t) {
          const n = t.nodeName.toLowerCase();
          if (!Wu.hasOwnProperty(n))
            return (this.sanitizedSomething = !0), !_S.hasOwnProperty(n);
          this.buf.push("<"), this.buf.push(n);
          const r = t.attributes;
          for (let i = 0; i < r.length; i++) {
            const s = r.item(i),
              o = s.name,
              a = o.toLowerCase();
            if (!Kp.hasOwnProperty(a)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let l = s.value;
            Gu[a] && (l = Ho(l)), this.buf.push(" ", o, '="', Qp(l), '"');
          }
          return this.buf.push(">"), !0;
        }
        endElement(t) {
          const n = t.nodeName.toLowerCase();
          Wu.hasOwnProperty(n) &&
            !Wp.hasOwnProperty(n) &&
            (this.buf.push("</"), this.buf.push(n), this.buf.push(">"));
        }
        chars(t) {
          this.buf.push(Qp(t));
        }
        checkClobberedElement(t, n) {
          if (
            n &&
            (t.compareDocumentPosition(n) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            );
          return n;
        }
      }
      const ES = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        wS = /([^\#-~ |!])/g;
      function Qp(e) {
        return e
          .replace(/&/g, "&amp;")
          .replace(ES, function (t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(wS, function (t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let zo;
      function Yp(e, t) {
        let n = null;
        try {
          zo =
            zo ||
            (function zp(e) {
              const t = new mS(e);
              return (function yS() {
                try {
                  return !!new window.DOMParser().parseFromString(
                    ur(""),
                    "text/html"
                  );
                } catch {
                  return !1;
                }
              })()
                ? new gS(t)
                : t;
            })(e);
          let r = t ? String(t) : "";
          n = zo.getInertBodyElement(r);
          let i = 5,
            s = r;
          do {
            if (0 === i)
              throw new Error(
                "Failed to sanitize html because the input is unstable"
              );
            i--, (r = s), (s = n.innerHTML), (n = zo.getInertBodyElement(r));
          } while (r !== s);
          return ur(new DS().sanitizeChildren(qu(n) || n));
        } finally {
          if (n) {
            const r = qu(n) || n;
            for (; r.firstChild; ) r.removeChild(r.firstChild);
          }
        }
      }
      function qu(e) {
        return "content" in e &&
          (function CS(e) {
            return (
              e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
            );
          })(e)
          ? e.content
          : null;
      }
      var ce = (() => (
        ((ce = ce || {})[(ce.NONE = 0)] = "NONE"),
        (ce[(ce.HTML = 1)] = "HTML"),
        (ce[(ce.STYLE = 2)] = "STYLE"),
        (ce[(ce.SCRIPT = 3)] = "SCRIPT"),
        (ce[(ce.URL = 4)] = "URL"),
        (ce[(ce.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        ce
      ))();
      function Zp(e) {
        const t = ls();
        return t
          ? $p(t.sanitize(ce.HTML, e) || "")
          : an(e, "HTML")
          ? $p(vt(e))
          : Yp(
              (function jp() {
                return void 0 !== Hu
                  ? Hu
                  : typeof document < "u"
                  ? document
                  : void 0;
              })(),
              j(e)
            );
      }
      function as(e) {
        const t = ls();
        return t
          ? t.sanitize(ce.URL, e) || ""
          : an(e, "URL")
          ? vt(e)
          : Ho(j(e));
      }
      function ls() {
        const e = v();
        return e && e[12];
      }
      const Ku = new k("ENVIRONMENT_INITIALIZER"),
        Jp = new k("INJECTOR", -1),
        eg = new k("INJECTOR_DEF_TYPES");
      class tg {
        get(t, n = Yi) {
          if (n === Yi) {
            const r = new Error(`NullInjectorError: No provider for ${oe(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function RS(...e) {
        return { ɵproviders: ng(0, e) };
      }
      function ng(e, ...t) {
        const n = [],
          r = new Set();
        let i;
        return (
          Dn(t, (s) => {
            const o = s;
            Qu(o, n, [], r) && (i || (i = []), i.push(o));
          }),
          void 0 !== i && rg(i, n),
          n
        );
      }
      function rg(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: i } = e[n];
          Dn(i, (s) => {
            t.push(s);
          });
        }
      }
      function Qu(e, t, n, r) {
        if (!(e = L(e))) return !1;
        let i = null,
          s = ph(e);
        const o = !s && re(e);
        if (s || o) {
          if (o && !o.standalone) return !1;
          i = e;
        } else {
          const l = e.ngModule;
          if (((s = ph(l)), !s)) return !1;
          i = l;
        }
        const a = r.has(i);
        if (o) {
          if (a) return !1;
          if ((r.add(i), o.dependencies)) {
            const l =
              "function" == typeof o.dependencies
                ? o.dependencies()
                : o.dependencies;
            for (const u of l) Qu(u, t, n, r);
          }
        } else {
          if (!s) return !1;
          {
            if (null != s.imports && !a) {
              let u;
              r.add(i);
              try {
                Dn(s.imports, (c) => {
                  Qu(c, t, n, r) && (u || (u = []), u.push(c));
                });
              } finally {
              }
              void 0 !== u && rg(u, t);
            }
            if (!a) {
              const u = ar(i) || (() => new i());
              t.push(
                { provide: i, useFactory: u, deps: te },
                { provide: eg, useValue: i, multi: !0 },
                { provide: Ku, useValue: () => I(i), multi: !0 }
              );
            }
            const l = s.providers;
            null == l ||
              a ||
              Dn(l, (c) => {
                t.push(c);
              });
          }
        }
        return i !== e && void 0 !== e.providers;
      }
      const NS = se({ provide: String, useValue: se });
      function Yu(e) {
        return null !== e && "object" == typeof e && NS in e;
      }
      function dr(e) {
        return "function" == typeof e;
      }
      const Zu = new k("Set Injector scope."),
        Wo = {},
        PS = {};
      let Xu;
      function Go() {
        return void 0 === Xu && (Xu = new tg()), Xu;
      }
      class $n {}
      class og extends $n {
        constructor(t, n, r, i) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = i),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            ec(t, (o) => this.processProvider(o)),
            this.records.set(Jp, Xr(void 0, this)),
            i.has("environment") && this.records.set($n, Xr(void 0, this));
          const s = this.records.get(Zu);
          null != s && "string" == typeof s.value && this.scopes.add(s.value),
            (this.injectorDefTypes = new Set(this.get(eg.multi, te, x.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = Qr(this),
            r = Mt(void 0);
          try {
            return t();
          } finally {
            Qr(n), Mt(r);
          }
        }
        get(t, n = Yi, r = x.Default) {
          this.assertNotDestroyed();
          const i = Qr(this),
            s = Mt(void 0);
          try {
            if (!(r & x.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function VS(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof k)
                    );
                  })(t) && po(t);
                (a = l && this.injectableDefInScope(l) ? Xr(Ju(t), Wo) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & x.Self ? Go() : this.parent).get(
              t,
              (n = r & x.Optional && n === Yi ? null : n)
            );
          } catch (o) {
            if ("NullInjectorError" === o.name) {
              if (((o[Fo] = o[Fo] || []).unshift(oe(t)), i)) throw o;
              return (function lb(e, t, n, r) {
                const i = e[Fo];
                throw (
                  (t[ip] && i.unshift(t[ip]),
                  (e.message = (function ub(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let i = oe(t);
                    if (Array.isArray(t)) i = t.map(oe).join(" -> ");
                    else if ("object" == typeof t) {
                      let s = [];
                      for (let o in t)
                        if (t.hasOwnProperty(o)) {
                          let a = t[o];
                          s.push(
                            o +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : oe(a))
                          );
                        }
                      i = `{${s.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${e.replace(
                      ib,
                      "\n  "
                    )}`;
                  })("\n" + e.message, i, n, r)),
                  (e.ngTokenPath = i),
                  (e[Fo] = null),
                  e)
                );
              })(o, t, "R3InjectorError", this.source);
            }
            throw o;
          } finally {
            Mt(s), Qr(i);
          }
        }
        resolveInjectorInitializers() {
          const t = Qr(this),
            n = Mt(void 0);
          try {
            const r = this.get(Ku.multi, te, x.Self);
            for (const i of r) i();
          } finally {
            Qr(t), Mt(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(oe(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new D(205, !1);
        }
        processProvider(t) {
          let n = dr((t = L(t))) ? t : L(t && t.provide);
          const r = (function FS(e) {
            return Yu(e)
              ? Xr(void 0, e.useValue)
              : Xr(
                  (function ag(e, t, n) {
                    let r;
                    if (dr(e)) {
                      const i = L(e);
                      return ar(i) || Ju(i);
                    }
                    if (Yu(e)) r = () => L(e.useValue);
                    else if (
                      (function sg(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...Eu(e.deps || []));
                    else if (
                      (function ig(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => I(L(e.useExisting));
                    else {
                      const i = L(e && (e.useClass || e.provide));
                      if (
                        !(function LS(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return ar(i) || Ju(i);
                      r = () => new i(...Eu(e.deps));
                    }
                    return r;
                  })(e),
                  Wo
                );
          })(t);
          if (dr(t) || !0 !== t.multi) this.records.get(n);
          else {
            let i = this.records.get(n);
            i ||
              ((i = Xr(void 0, Wo, !0)),
              (i.factory = () => Eu(i.multi)),
              this.records.set(n, i)),
              (n = t),
              i.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Wo && ((n.value = PS), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function kS(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = L(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function Ju(e) {
        const t = po(e),
          n = null !== t ? t.factory : ar(e);
        if (null !== n) return n;
        if (e instanceof k) throw new D(204, !1);
        if (e instanceof Function)
          return (function OS(e) {
            const t = e.length;
            if (t > 0) throw (Qi(t, "?"), new D(204, !1));
            const n = (function Hw(e) {
              const t = e && (e[go] || e[gh]);
              if (t) {
                const n = (function zw(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new D(204, !1);
      }
      function Xr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function BS(e) {
        return !!e.ɵproviders;
      }
      function ec(e, t) {
        for (const n of e)
          Array.isArray(n) ? ec(n, t) : BS(n) ? ec(n.ɵproviders, t) : t(n);
      }
      class lg {}
      class US {
        resolveComponentFactory(t) {
          throw (function $S(e) {
            const t = Error(
              `No component factory found for ${oe(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let us = (() => {
        class e {}
        return (e.NULL = new US()), e;
      })();
      function HS() {
        return Jr(Ne(), v());
      }
      function Jr(e, t) {
        return new qt(pt(e, t));
      }
      let qt = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = HS), e;
      })();
      function zS(e) {
        return e instanceof qt ? e.nativeElement : e;
      }
      class cs {}
      let qo = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function WS() {
                const e = v(),
                  n = gt(Ne().index, e);
                return (at(n) ? n : e)[H];
              })()),
            e
          );
        })(),
        GS = (() => {
          class e {}
          return (
            (e.ɵprov = V({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class Ko {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const qS = new Ko("14.3.0"),
        tc = {};
      function rc(e) {
        return e.ngOriginalError;
      }
      class ei {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && rc(t);
          for (; n && rc(n); ) n = rc(n);
          return n || null;
        }
      }
      function cg(e) {
        return e.ownerDocument;
      }
      function wn(e) {
        return e instanceof Function ? e() : e;
      }
      function fg(e, t, n) {
        let r = e.length;
        for (;;) {
          const i = e.indexOf(t, n);
          if (-1 === i) return i;
          if (0 === i || e.charCodeAt(i - 1) <= 32) {
            const s = t.length;
            if (i + s === r || e.charCodeAt(i + s) <= 32) return i;
          }
          n = i + 1;
        }
      }
      const hg = "ng-template";
      function rT(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let i = e[r++];
          if (n && "class" === i) {
            if (((i = e[r]), -1 !== fg(i.toLowerCase(), t, 0))) return !0;
          } else if (1 === i) {
            for (; r < e.length && "string" == typeof (i = e[r++]); )
              if (i.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function pg(e) {
        return 4 === e.type && e.value !== hg;
      }
      function iT(e, t, n) {
        return t === (4 !== e.type || n ? e.value : hg);
      }
      function sT(e, t, n) {
        let r = 4;
        const i = e.attrs || [],
          s = (function lT(e) {
            for (let t = 0; t < e.length; t++) if (jh(e[t])) return t;
            return e.length;
          })(i);
        let o = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !iT(e, l, n)) || ("" === l && 1 === t.length))
                ) {
                  if (Kt(r)) return !1;
                  o = !0;
                }
              } else {
                const u = 8 & r ? l : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!rT(e.attrs, u, n)) {
                    if (Kt(r)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const d = oT(8 & r ? "class" : l, i, pg(e), n);
                if (-1 === d) {
                  if (Kt(r)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== u) {
                  let f;
                  f = d > s ? "" : i[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== fg(h, u, 0)) || (2 & r && u !== f)) {
                    if (Kt(r)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !Kt(r) && !Kt(l)) return !1;
            if (o && Kt(l)) continue;
            (o = !1), (r = l | (1 & r));
          }
        }
        return Kt(r) || o;
      }
      function Kt(e) {
        return 0 == (1 & e);
      }
      function oT(e, t, n, r) {
        if (null === t) return -1;
        let i = 0;
        if (r || !n) {
          let s = !1;
          for (; i < t.length; ) {
            const o = t[i];
            if (o === e) return i;
            if (3 === o || 6 === o) s = !0;
            else {
              if (1 === o || 2 === o) {
                let a = t[++i];
                for (; "string" == typeof a; ) a = t[++i];
                continue;
              }
              if (4 === o) break;
              if (0 === o) {
                i += 4;
                continue;
              }
            }
            i += s ? 1 : 2;
          }
          return -1;
        }
        return (function uT(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function gg(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (sT(e, t[r], n)) return !0;
        return !1;
      }
      function cT(e, t) {
        e: for (let n = 0; n < t.length; n++) {
          const r = t[n];
          if (e.length === r.length) {
            for (let i = 0; i < e.length; i++) if (e[i] !== r[i]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function mg(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function dT(e) {
        let t = e[0],
          n = 1,
          r = 2,
          i = "",
          s = !1;
        for (; n < e.length; ) {
          let o = e[n];
          if ("string" == typeof o)
            if (2 & r) {
              const a = e[++n];
              i += "[" + o + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (i += "." + o) : 4 & r && (i += " " + o);
          else
            "" !== i && !Kt(o) && ((t += mg(s, i)), (i = "")),
              (r = o),
              (s = s || !Kt(r));
          n++;
        }
        return "" !== i && (t += mg(s, i)), t;
      }
      const $ = {};
      function ie(e) {
        yg(Y(), v(), nt() + e, !1);
      }
      function yg(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const s = e.preOrderCheckHooks;
            null !== s && So(t, s, n);
          } else {
            const s = e.preOrderHooks;
            null !== s && To(t, s, 0, n);
          }
        Bn(n);
      }
      function Eg(e, t = null, n = null, r) {
        const i = wg(e, t, n, r);
        return i.resolveInjectorInitializers(), i;
      }
      function wg(e, t = null, n = null, r, i = new Set()) {
        const s = [n || te, RS(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : oe(e))),
          new og(s, t || Go(), r || null, i)
        );
      }
      let Nt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return Eg({ name: "" }, r, n, "");
            {
              const i = n.name ?? "";
              return Eg({ name: i }, n.parent, n.providers, i);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Yi),
          (e.NULL = new tg()),
          (e.ɵprov = V({ token: e, providedIn: "any", factory: () => I(Jp) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function T(e, t = x.Default) {
        const n = v();
        return null === n ? I(e, t) : Kh(Ne(), n, L(e), t);
      }
      function lc() {
        throw new Error("invalid");
      }
      function Yo(e, t) {
        return (e << 17) | (t << 2);
      }
      function Qt(e) {
        return (e >> 17) & 32767;
      }
      function uc(e) {
        return 2 | e;
      }
      function Cn(e) {
        return (131068 & e) >> 2;
      }
      function cc(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function dc(e) {
        return 1 | e;
      }
      function Bg(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r],
              s = n[r + 1];
            if (-1 !== s) {
              const o = e.data[s];
              au(i), o.contentQueries(2, t[s], s);
            }
          }
      }
      function Jo(e, t, n, r, i, s, o, a, l, u, c) {
        const d = t.blueprint.slice();
        return (
          (d[0] = i),
          (d[2] = 76 | r),
          (null !== c || (e && 1024 & e[2])) && (d[2] |= 1024),
          Th(d),
          (d[3] = d[15] = e),
          (d[8] = n),
          (d[10] = o || (e && e[10])),
          (d[H] = a || (e && e[H])),
          (d[12] = l || (e && e[12]) || null),
          (d[9] = u || (e && e[9]) || null),
          (d[6] = s),
          (d[20] = (function Tb() {
            return Sb++;
          })()),
          (d[21] = c),
          (d[16] = 2 == t.type ? e[16] : d),
          d
        );
      }
      function ri(e, t, n, r, i) {
        let s = e.data[t];
        if (null === s)
          (s = (function _c(e, t, n, r, i) {
            const s = Ah(),
              o = ru(),
              l = (e.data[t] = (function qT(e, t, n, r, i, s) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: i,
                  attrs: s,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, o ? s : s && s.parent, n, t, r, i));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== s &&
                (o
                  ? null == s.child && null !== l.parent && (s.child = l)
                  : null === s.next && (s.next = l)),
              l
            );
          })(e, t, n, r, i)),
            (function EC() {
              return B.lFrame.inI18n;
            })() && (s.flags |= 64);
        else if (64 & s.type) {
          (s.type = n), (s.value = r), (s.attrs = i);
          const o = (function $i() {
            const e = B.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          s.injectorIndex = null === o ? -1 : o.injectorIndex;
        }
        return sn(s, !0), s;
      }
      function ii(e, t, n, r) {
        if (0 === n) return -1;
        const i = t.length;
        for (let s = 0; s < n; s++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return i;
      }
      function Dc(e, t, n) {
        lu(t);
        try {
          const r = e.viewQuery;
          null !== r && Mc(1, r, n);
          const i = e.template;
          null !== i && jg(e, t, i, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Bg(e, t),
            e.staticViewQueries && Mc(2, e.viewQuery, n);
          const s = e.components;
          null !== s &&
            (function zT(e, t) {
              for (let n = 0; n < t.length; n++) uI(e, t[n]);
            })(t, s);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), uu();
        }
      }
      function ea(e, t, n, r) {
        const i = t[2];
        if (128 != (128 & i)) {
          lu(t);
          try {
            Th(t),
              (function Nh(e) {
                return (B.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && jg(e, t, n, 2, r);
            const o = 3 == (3 & i);
            if (o) {
              const u = e.preOrderCheckHooks;
              null !== u && So(t, u, null);
            } else {
              const u = e.preOrderHooks;
              null !== u && To(t, u, 0, null), cu(t, 0);
            }
            if (
              ((function aI(e) {
                for (let t = Nu(e); null !== t; t = xu(t)) {
                  if (!t[2]) continue;
                  const n = t[9];
                  for (let r = 0; r < n.length; r++) {
                    const i = n[r],
                      s = i[3];
                    0 == (512 & i[2]) && nu(s, 1), (i[2] |= 512);
                  }
                }
              })(t),
              (function oI(e) {
                for (let t = Nu(e); null !== t; t = xu(t))
                  for (let n = 10; n < t.length; n++) {
                    const r = t[n],
                      i = r[1];
                    Co(r) && ea(i, r, i.template, r[8]);
                  }
              })(t),
              null !== e.contentQueries && Bg(e, t),
              o)
            ) {
              const u = e.contentCheckHooks;
              null !== u && So(t, u);
            } else {
              const u = e.contentHooks;
              null !== u && To(t, u, 1), cu(t, 1);
            }
            !(function UT(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const i = n[r];
                    if (i < 0) Bn(~i);
                    else {
                      const s = i,
                        o = n[++r],
                        a = n[++r];
                      wC(o, s), a(2, t[s]);
                    }
                  }
                } finally {
                  Bn(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function HT(e, t) {
                for (let n = 0; n < t.length; n++) lI(e, t[n]);
              })(t, a);
            const l = e.viewQuery;
            if ((null !== l && Mc(2, l, r), o)) {
              const u = e.viewCheckHooks;
              null !== u && So(t, u);
            } else {
              const u = e.viewHooks;
              null !== u && To(t, u, 2), cu(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), nu(t[3], -1));
          } finally {
            uu();
          }
        }
      }
      function jg(e, t, n, r, i) {
        const s = nt(),
          o = 2 & r;
        try {
          Bn(-1), o && t.length > 22 && yg(e, t, 22, !1), n(r, i);
        } finally {
          Bn(s);
        }
      }
      function $g(e, t, n) {
        if (Yl(t)) {
          const i = t.directiveEnd;
          for (let s = t.directiveStart; s < i; s++) {
            const o = e.data[s];
            o.contentQueries && o.contentQueries(1, n[s], s);
          }
        }
      }
      function Ec(e, t, n) {
        !Mh() ||
          ((function XT(e, t, n, r) {
            const i = n.directiveStart,
              s = n.directiveEnd;
            e.firstCreatePass || zi(n, t), qe(r, t);
            const o = n.initialInputs;
            for (let a = i; a < s; a++) {
              const l = e.data[a],
                u = Gt(l);
              u && rI(t, n, l);
              const c = Wi(t, e, a, n);
              qe(c, t),
                null !== o && iI(0, a - i, c, l, 0, o),
                u && (gt(n.index, t)[8] = c);
            }
          })(e, t, n, pt(n, t)),
          128 == (128 & n.flags) &&
            (function JT(e, t, n) {
              const r = n.directiveStart,
                i = n.directiveEnd,
                s = n.index,
                o = (function CC() {
                  return B.lFrame.currentDirectiveIndex;
                })();
              try {
                Bn(s);
                for (let a = r; a < i; a++) {
                  const l = e.data[a],
                    u = t[a];
                  su(a),
                    (null !== l.hostBindings ||
                      0 !== l.hostVars ||
                      null !== l.hostAttrs) &&
                      Kg(l, u);
                }
              } finally {
                Bn(-1), su(o);
              }
            })(e, t, n));
      }
      function wc(e, t, n = pt) {
        const r = t.localNames;
        if (null !== r) {
          let i = t.index + 1;
          for (let s = 0; s < r.length; s += 2) {
            const o = r[s + 1],
              a = -1 === o ? n(t, e) : e[o];
            e[i++] = a;
          }
        }
      }
      function Ug(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Cc(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function Cc(e, t, n, r, i, s, o, a, l, u) {
        const c = 22 + r,
          d = c + i,
          f = (function WT(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : $);
            return n;
          })(c, d),
          h = "function" == typeof u ? u() : u;
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof s ? s() : s,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function Hg(e, t, n, r) {
        const i = Jg(t);
        null === n
          ? i.push(r)
          : (i.push(n), e.firstCreatePass && em(e).push(r, i.length - 1));
      }
      function zg(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const i = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, i)
              : (n[r] = [t, i]);
          }
        return n;
      }
      function Wg(e, t) {
        const r = t.directiveEnd,
          i = e.data,
          s = t.attrs,
          o = [];
        let a = null,
          l = null;
        for (let u = t.directiveStart; u < r; u++) {
          const c = i[u],
            d = c.inputs,
            f = null === s || pg(t) ? null : sI(d, s);
          o.push(f), (a = zg(d, u, a)), (l = zg(c.outputs, u, l));
        }
        null !== a &&
          (a.hasOwnProperty("class") && (t.flags |= 16),
          a.hasOwnProperty("style") && (t.flags |= 32)),
          (t.initialInputs = o),
          (t.inputs = a),
          (t.outputs = l);
      }
      function Gg(e, t) {
        const n = gt(t, e);
        16 & n[2] || (n[2] |= 32);
      }
      function bc(e, t, n, r) {
        let i = !1;
        if (Mh()) {
          const s = (function eI(e, t, n) {
              const r = e.directiveRegistry;
              let i = null;
              if (r)
                for (let s = 0; s < r.length; s++) {
                  const o = r[s];
                  gg(n, o.selectors, !1) &&
                    (i || (i = []),
                    No(zi(n, t), e, o.type),
                    Gt(o) ? (Qg(e, n), i.unshift(o)) : i.push(o));
                }
              return i;
            })(e, t, n),
            o = null === r ? null : { "": -1 };
          if (null !== s) {
            (i = !0), Yg(n, e.data.length, s.length);
            for (let c = 0; c < s.length; c++) {
              const d = s[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              u = ii(e, t, s.length, null);
            for (let c = 0; c < s.length; c++) {
              const d = s[c];
              (n.mergedAttrs = Mo(n.mergedAttrs, d.hostAttrs)),
                Zg(e, n, t, u, d),
                nI(u, d, o),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !l &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (l = !0)),
                u++;
            }
            Wg(e, n);
          }
          o &&
            (function tI(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let i = 0; i < t.length; i += 2) {
                  const s = n[t[i + 1]];
                  if (null == s) throw new D(-301, !1);
                  r.push(t[i], s);
                }
              }
            })(n, r, o);
        }
        return (n.mergedAttrs = Mo(n.mergedAttrs, n.attrs)), i;
      }
      function qg(e, t, n, r, i, s) {
        const o = s.hostBindings;
        if (o) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const l = ~t.index;
          (function ZT(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(r, i, o);
        }
      }
      function Kg(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Qg(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function nI(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Gt(t) && (n[""] = e);
        }
      }
      function Yg(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function Zg(e, t, n, r, i) {
        e.data[r] = i;
        const s = i.factory || (i.factory = ar(i.type)),
          o = new Ui(s, Gt(i), T);
        (e.blueprint[r] = o),
          (n[r] = o),
          qg(e, t, 0, r, ii(e, n, i.hostVars, $), i);
      }
      function rI(e, t, n) {
        const r = pt(t, e),
          i = Ug(n),
          s = e[10],
          o = ta(
            e,
            Jo(
              e,
              i,
              null,
              n.onPush ? 32 : 16,
              r,
              t,
              s,
              s.createRenderer(r, n),
              null,
              null,
              null
            )
          );
        e[t.index] = o;
      }
      function iI(e, t, n, r, i, s) {
        const o = s[t];
        if (null !== o) {
          const a = r.setInput;
          for (let l = 0; l < o.length; ) {
            const u = o[l++],
              c = o[l++],
              d = o[l++];
            null !== a ? r.setInput(n, d, u, c) : (n[c] = d);
          }
        }
      }
      function sI(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const i = t[r];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              e.hasOwnProperty(i) &&
                (null === n && (n = []), n.push(i, e[i], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Xg(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function lI(e, t) {
        const n = gt(t, e);
        if (Co(n)) {
          const r = n[1];
          48 & n[2] ? ea(r, n, r.template, n[8]) : n[5] > 0 && Tc(n);
        }
      }
      function Tc(e) {
        for (let r = Nu(e); null !== r; r = xu(r))
          for (let i = 10; i < r.length; i++) {
            const s = r[i];
            if (Co(s))
              if (512 & s[2]) {
                const o = s[1];
                ea(o, s, o.template, s[8]);
              } else s[5] > 0 && Tc(s);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const i = gt(n[r], e);
            Co(i) && i[5] > 0 && Tc(i);
          }
      }
      function uI(e, t) {
        const n = gt(t, e),
          r = n[1];
        (function cI(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          Dc(r, n, n[8]);
      }
      function ta(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function Ic(e) {
        for (; e; ) {
          e[2] |= 32;
          const t = is(e);
          if (Jw(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function na(e, t, n, r = !0) {
        const i = t[10];
        i.begin && i.begin();
        try {
          ea(e, t, e.template, n);
        } catch (o) {
          throw (r && nm(t, o), o);
        } finally {
          i.end && i.end();
        }
      }
      function Mc(e, t, n) {
        au(0), t(e, n);
      }
      function Jg(e) {
        return e[7] || (e[7] = []);
      }
      function em(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function nm(e, t) {
        const n = e[9],
          r = n ? n.get(ei, null) : null;
        r && r.handleError(t);
      }
      function Ac(e, t, n, r, i) {
        for (let s = 0; s < n.length; ) {
          const o = n[s++],
            a = n[s++],
            l = t[o],
            u = e.data[o];
          null !== u.setInput ? u.setInput(l, i, r, a) : (l[a] = i);
        }
      }
      function ra(e, t, n) {
        let r = n ? e.styles : null,
          i = n ? e.classes : null,
          s = 0;
        if (null !== t)
          for (let o = 0; o < t.length; o++) {
            const a = t[o];
            "number" == typeof a
              ? (s = a)
              : 1 == s
              ? (i = $l(i, a))
              : 2 == s && (r = $l(r, a + ": " + t[++o] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = i) : (e.classesWithoutHost = i);
      }
      function ia(e, t, n, r, i = !1) {
        for (; null !== n; ) {
          const s = t[n.index];
          if ((null !== s && r.push(Me(s)), Wt(s)))
            for (let a = 10; a < s.length; a++) {
              const l = s[a],
                u = l[1].firstChild;
              null !== u && ia(l[1], l, u, r);
            }
          const o = n.type;
          if (8 & o) ia(e, t, n.child, r);
          else if (32 & o) {
            const a = Ru(n, t);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & o) {
            const a = kp(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = is(t[16]);
              ia(l[1], l, a, r, !0);
            }
          }
          n = i ? n.projectionNext : n.next;
        }
        return r;
      }
      class ds {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return ia(n, t, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (Wt(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Fu(t, r), Po(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Mp(this._lView[1], this._lView);
        }
        onDestroy(t) {
          Hg(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          Ic(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          na(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new D(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function Hb(e, t) {
              ss(e, t, t[H], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new D(902, !1);
          this._appRef = t;
        }
      }
      class dI extends ds {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          na(t[1], t, t[8], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Rc extends us {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = re(t);
          return new fs(n, this.ngModule);
        }
      }
      function rm(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class hI {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          const i = this.injector.get(t, tc, r);
          return i !== tc || n === tc ? i : this.parentInjector.get(t, n, r);
        }
      }
      class fs extends lg {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function fT(e) {
              return e.map(dT).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return rm(this.componentDef.inputs);
        }
        get outputs() {
          return rm(this.componentDef.outputs);
        }
        create(t, n, r, i) {
          let s = (i = i || this.ngModule) instanceof $n ? i : i?.injector;
          s &&
            null !== this.componentDef.getStandaloneInjector &&
            (s = this.componentDef.getStandaloneInjector(s) || s);
          const o = s ? new hI(t, s) : t,
            a = o.get(cs, null);
          if (null === a) throw new D(407, !1);
          const l = o.get(GS, null),
            u = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function GT(e, t, n) {
                  return e.selectRootElement(t, n === Ht.ShadowDom);
                })(u, r, this.componentDef.encapsulation)
              : Ou(
                  u,
                  c,
                  (function fI(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = Cc(0, null, null, 1, 0, null, null, null, null, null),
            p = Jo(null, h, null, f, null, null, a, u, l, o, null);
          let g, m;
          lu(p);
          try {
            const _ = (function mI(e, t, n, r, i, s) {
              const o = n[1];
              n[22] = e;
              const l = ri(o, 22, 2, "#host", null),
                u = (l.mergedAttrs = t.hostAttrs);
              null !== u &&
                (ra(l, u, !0),
                null !== e &&
                  (Io(i, e, u),
                  null !== l.classes && $u(i, e, l.classes),
                  null !== l.styles && Bp(i, e, l.styles)));
              const c = r.createRenderer(e, t),
                d = Jo(
                  n,
                  Ug(t),
                  null,
                  t.onPush ? 32 : 16,
                  n[22],
                  l,
                  r,
                  c,
                  s || null,
                  null,
                  null
                );
              return (
                o.firstCreatePass &&
                  (No(zi(l, n), o, t.type), Qg(o, l), Yg(l, n.length, 1)),
                ta(n, d),
                (n[22] = d)
              );
            })(d, this.componentDef, p, a, u);
            if (d)
              if (r) Io(u, d, ["ng-version", qS.full]);
              else {
                const { attrs: E, classes: y } = (function hT(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    i = 2;
                  for (; r < e.length; ) {
                    let s = e[r];
                    if ("string" == typeof s)
                      2 === i
                        ? "" !== s && t.push(s, e[++r])
                        : 8 === i && n.push(s);
                    else {
                      if (!Kt(i)) break;
                      i = s;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                E && Io(u, d, E), y && y.length > 0 && $u(u, d, y.join(" "));
              }
            if (((m = tu(h, 22)), void 0 !== n)) {
              const E = (m.projection = []);
              for (let y = 0; y < this.ngContentSelectors.length; y++) {
                const b = n[y];
                E.push(null != b ? Array.from(b) : null);
              }
            }
            (g = (function yI(e, t, n, r) {
              const i = n[1],
                s = (function YT(e, t, n) {
                  const r = Ne();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Zg(e, r, t, ii(e, t, 1, null), n),
                    Wg(e, r));
                  const i = Wi(t, e, r.directiveStart, r);
                  qe(i, t);
                  const s = pt(r, t);
                  return s && qe(s, t), i;
                })(i, n, t);
              if (((e[8] = n[8] = s), null !== r)) for (const a of r) a(s, t);
              if (t.contentQueries) {
                const a = Ne();
                t.contentQueries(1, s, a.directiveStart);
              }
              const o = Ne();
              return (
                !i.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (Bn(o.index),
                  qg(n[1], o, 0, o.directiveStart, o.directiveEnd, t),
                  Kg(t, s)),
                s
              );
            })(_, this.componentDef, p, [vI])),
              Dc(h, p, null);
          } finally {
            uu();
          }
          return new gI(this.componentType, g, Jr(m, p), p, m);
        }
      }
      class gI extends class jS {} {
        constructor(t, n, r, i, s) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = s),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new dI(i)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let i;
          if (null !== r && (i = r[t])) {
            const s = this._rootLView;
            Ac(s[1], s, i, t, n), Gg(s, this._tNode.index);
          }
        }
        get injector() {
          return new Hr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function vI() {
        const e = Ne();
        bo(v()[1], e);
      }
      let sa = null;
      function fr() {
        if (!sa) {
          const e = le.Symbol;
          if (e && e.iterator) sa = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (sa = r);
            }
          }
        }
        return sa;
      }
      function hs(e) {
        return (
          !!xc(e) && (Array.isArray(e) || (!(e instanceof Map) && fr() in e))
        );
      }
      function xc(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function un(e, t, n) {
        return (e[t] = n);
      }
      function ps(e, t) {
        return e[t];
      }
      function Ke(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function hr(e, t, n, r) {
        const i = Ke(e, t, n);
        return Ke(e, t + 1, r) || i;
      }
      function ae(e, t, n, r, i, s, o, a) {
        const l = v(),
          u = Y(),
          c = e + 22,
          d = u.firstCreatePass
            ? (function RI(e, t, n, r, i, s, o, a, l) {
                const u = t.consts,
                  c = ri(t, e, 4, o || null, Vn(u, a));
                bc(t, n, c, Vn(u, l)), bo(t, c);
                const d = (c.tViews = Cc(
                  2,
                  c,
                  r,
                  i,
                  s,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  u
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, t, n, r, i, s, o)
            : u.data[c];
        sn(d, !1);
        const f = l[H].createComment("");
        Bo(u, l, f, d),
          qe(f, l),
          ta(l, (l[c] = Xg(f, l, f, d))),
          Eo(d) && Ec(u, l, d),
          null != o && wc(l, d, a);
      }
      function Z(e, t, n) {
        const r = v();
        return (
          Ke(r, jr(), t) &&
            (function _t(e, t, n, r, i, s, o, a) {
              const l = pt(t, n);
              let c,
                u = t.inputs;
              !a && null != u && (c = u[r])
                ? (Ac(e, n, c, r, i), Do(t) && Gg(n, t.index))
                : 3 & t.type &&
                  ((r = (function KT(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (i = null != o ? o(i, t.value || "", r) : i),
                  s.setProperty(l, r, i));
            })(
              Y(),
              (function me() {
                const e = B.lFrame;
                return tu(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[H],
              n,
              !1
            ),
          Z
        );
      }
      function Oc(e, t, n, r, i) {
        const o = i ? "class" : "style";
        Ac(e, n, t.inputs[o], o, r);
      }
      function M(e, t, n, r) {
        const i = v(),
          s = Y(),
          o = 22 + e,
          a = i[H],
          l = (i[o] = Ou(
            a,
            t,
            (function NC() {
              return B.lFrame.currentNamespace;
            })()
          )),
          u = s.firstCreatePass
            ? (function xI(e, t, n, r, i, s, o) {
                const a = t.consts,
                  u = ri(t, e, 2, i, Vn(a, s));
                return (
                  bc(t, n, u, Vn(a, o)),
                  null !== u.attrs && ra(u, u.attrs, !1),
                  null !== u.mergedAttrs && ra(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(o, s, i, 0, t, n, r)
            : s.data[o];
        sn(u, !0);
        const c = u.mergedAttrs;
        null !== c && Io(a, l, c);
        const d = u.classes;
        null !== d && $u(a, l, d);
        const f = u.styles;
        return (
          null !== f && Bp(a, l, f),
          64 != (64 & u.flags) && Bo(s, i, l, u),
          0 ===
            (function hC() {
              return B.lFrame.elementDepthCount;
            })() && qe(l, i),
          (function pC() {
            B.lFrame.elementDepthCount++;
          })(),
          Eo(u) && (Ec(s, i, u), $g(s, u, i)),
          null !== r && wc(i, u),
          M
        );
      }
      function P() {
        let e = Ne();
        ru() ? iu() : ((e = e.parent), sn(e, !1));
        const t = e;
        !(function gC() {
          B.lFrame.elementDepthCount--;
        })();
        const n = Y();
        return (
          n.firstCreatePass && (bo(n, e), Yl(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function LC(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Oc(n, t, v(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function kC(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            Oc(n, t, v(), t.stylesWithoutHost, !1),
          P
        );
      }
      function he(e, t, n, r) {
        return M(e, t, n, r), P(), he;
      }
      function aa(e, t, n) {
        const r = v(),
          i = Y(),
          s = e + 22,
          o = i.firstCreatePass
            ? (function PI(e, t, n, r, i) {
                const s = t.consts,
                  o = Vn(s, r),
                  a = ri(t, e, 8, "ng-container", o);
                return (
                  null !== o && ra(a, o, !0),
                  bc(t, n, a, Vn(s, i)),
                  null !== t.queries && t.queries.elementStart(t, a),
                  a
                );
              })(s, i, r, t, n)
            : i.data[s];
        sn(o, !0);
        const a = (r[s] = r[H].createComment(""));
        return (
          Bo(i, r, a, o),
          qe(a, r),
          Eo(o) && (Ec(i, r, o), $g(i, o, r)),
          null != n && wc(r, o),
          aa
        );
      }
      function la() {
        let e = Ne();
        const t = Y();
        return (
          ru() ? iu() : ((e = e.parent), sn(e, !1)),
          t.firstCreatePass && (bo(t, e), Yl(e) && t.queries.elementEnd(e)),
          la
        );
      }
      function cn(e, t, n) {
        return aa(e, t, n), la(), cn;
      }
      function ua(e) {
        return !!e && "function" == typeof e.then;
      }
      const ym = function mm(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function pi(e, t, n, r) {
        const i = v(),
          s = Y(),
          o = Ne();
        return (
          (function _m(e, t, n, r, i, s, o, a) {
            const l = Eo(r),
              c = e.firstCreatePass && em(e),
              d = t[8],
              f = Jg(t);
            let h = !0;
            if (3 & r.type || a) {
              const m = pt(r, t),
                _ = a ? a(m) : m,
                E = f.length,
                y = a ? (W) => a(Me(W[r.index])) : r.index;
              let b = null;
              if (
                (!a &&
                  l &&
                  (b = (function FI(e, t, n, r) {
                    const i = e.cleanup;
                    if (null != i)
                      for (let s = 0; s < i.length - 1; s += 2) {
                        const o = i[s];
                        if (o === n && i[s + 1] === r) {
                          const a = t[7],
                            l = i[s + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof o && (s += 2);
                      }
                    return null;
                  })(e, t, i, r.index)),
                null !== b)
              )
                ((b.__ngLastListenerFn__ || b).__ngNextListenerFn__ = s),
                  (b.__ngLastListenerFn__ = s),
                  (h = !1);
              else {
                s = Em(r, t, d, s, !1);
                const W = n.listen(_, i, s);
                f.push(s, W), c && c.push(i, y, E, E + 1);
              }
            } else s = Em(r, t, d, s, !1);
            const p = r.outputs;
            let g;
            if (h && null !== p && (g = p[i])) {
              const m = g.length;
              if (m)
                for (let _ = 0; _ < m; _ += 2) {
                  const Q = t[g[_]][g[_ + 1]].subscribe(s),
                    ve = f.length;
                  f.push(s, Q), c && c.push(i, r.index, ve, -(ve + 1));
                }
            }
          })(s, i, i[H], o, e, t, 0, r),
          pi
        );
      }
      function Dm(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (i) {
          return nm(e, i), !1;
        }
      }
      function Em(e, t, n, r, i) {
        return function s(o) {
          if (o === Function) return r;
          Ic(2 & e.flags ? gt(e.index, t) : t);
          let l = Dm(t, 0, r, o),
            u = s.__ngNextListenerFn__;
          for (; u; ) (l = Dm(t, 0, u, o) && l), (u = u.__ngNextListenerFn__);
          return i && !1 === l && (o.preventDefault(), (o.returnValue = !1)), l;
        };
      }
      function Dt(e = 1) {
        return (function SC(e) {
          return (B.lFrame.contextLView = (function TC(e, t) {
            for (; e > 0; ) (t = t[15]), e--;
            return t;
          })(e, B.lFrame.contextLView))[8];
        })(e);
      }
      function LI(e, t) {
        let n = null;
        const r = (function aT(e) {
          const t = e.attrs;
          if (null != t) {
            const n = t.indexOf(5);
            if (0 == (1 & n)) return t[n + 1];
          }
          return null;
        })(e);
        for (let i = 0; i < t.length; i++) {
          const s = t[i];
          if ("*" !== s) {
            if (null === r ? gg(e, s, !0) : cT(r, s)) return i;
          } else n = i;
        }
        return n;
      }
      function gs(e) {
        const t = v()[16][6];
        if (!t.projection) {
          const r = (t.projection = Qi(e ? e.length : 1, null)),
            i = r.slice();
          let s = t.child;
          for (; null !== s; ) {
            const o = e ? LI(s, e) : 0;
            null !== o &&
              (i[o] ? (i[o].projectionNext = s) : (r[o] = s), (i[o] = s)),
              (s = s.next);
          }
        }
      }
      function pr(e, t = 0, n) {
        const r = v(),
          i = Y(),
          s = ri(i, 22 + e, 16, null, n || null);
        null === s.projection && (s.projection = t),
          iu(),
          64 != (64 & s.flags) &&
            (function Zb(e, t, n) {
              Vp(t[H], 0, t, n, Ap(e, n, t), Pp(n.parent || t[6], n, t));
            })(i, r, s);
      }
      function Nm(e, t, n, r, i) {
        const s = e[n + 1],
          o = null === t;
        let a = r ? Qt(s) : Cn(s),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const c = e[a + 1];
          BI(e[a], t) && ((l = !0), (e[a + 1] = r ? dc(c) : uc(c))),
            (a = r ? Qt(c) : Cn(c));
        }
        l && (e[n + 1] = r ? uc(s) : dc(s));
      }
      function BI(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && Kr(e, t) >= 0)
        );
      }
      const Pe = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function xm(e) {
        return e.substring(Pe.key, Pe.keyEnd);
      }
      function jI(e) {
        return e.substring(Pe.value, Pe.valueEnd);
      }
      function Pm(e, t) {
        const n = Pe.textEnd;
        return n === t
          ? -1
          : ((t = Pe.keyEnd =
              (function HI(e, t, n) {
                for (; t < n && e.charCodeAt(t) > 32; ) t++;
                return t;
              })(e, (Pe.key = t), n)),
            gi(e, t, n));
      }
      function Om(e, t) {
        const n = Pe.textEnd;
        let r = (Pe.key = gi(e, t, n));
        return n === r
          ? -1
          : ((r = Pe.keyEnd =
              (function zI(e, t, n) {
                let r;
                for (
                  ;
                  t < n &&
                  (45 === (r = e.charCodeAt(t)) ||
                    95 === r ||
                    ((-33 & r) >= 65 && (-33 & r) <= 90) ||
                    (r >= 48 && r <= 57));

                )
                  t++;
                return t;
              })(e, r, n)),
            (r = Lm(e, r, n)),
            (r = Pe.value = gi(e, r, n)),
            (r = Pe.valueEnd =
              (function WI(e, t, n) {
                let r = -1,
                  i = -1,
                  s = -1,
                  o = t,
                  a = o;
                for (; o < n; ) {
                  const l = e.charCodeAt(o++);
                  if (59 === l) return a;
                  34 === l || 39 === l
                    ? (a = o = km(e, l, o, n))
                    : t === o - 4 &&
                      85 === s &&
                      82 === i &&
                      76 === r &&
                      40 === l
                    ? (a = o = km(e, 41, o, n))
                    : l > 32 && (a = o),
                    (s = i),
                    (i = r),
                    (r = -33 & l);
                }
                return a;
              })(e, r, n)),
            Lm(e, r, n));
      }
      function Fm(e) {
        (Pe.key = 0),
          (Pe.keyEnd = 0),
          (Pe.value = 0),
          (Pe.valueEnd = 0),
          (Pe.textEnd = e.length);
      }
      function gi(e, t, n) {
        for (; t < n && e.charCodeAt(t) <= 32; ) t++;
        return t;
      }
      function Lm(e, t, n, r) {
        return (t = gi(e, t, n)) < n && t++, t;
      }
      function km(e, t, n, r) {
        let i = -1,
          s = n;
        for (; s < r; ) {
          const o = e.charCodeAt(s++);
          if (o == t && 92 !== i) return s;
          i = 92 == o && 92 === i ? 0 : o;
        }
        throw new Error();
      }
      function mi(e, t, n) {
        return (
          (function Yt(e, t, n, r) {
            const i = v(),
              s = Y(),
              o = _n(2);
            s.firstUpdatePass && jm(s, e, o, r),
              t !== $ &&
                Ke(i, o, t) &&
                Um(
                  s,
                  s.data[nt()],
                  i,
                  i[H],
                  e,
                  (i[o + 1] = (function JI(e, t) {
                    return (
                      null == e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = oe(vt(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  o
                );
          })(e, t, n, !1),
          mi
        );
      }
      function Pt(e) {
        Zt($m, GI, e, !1);
      }
      function GI(e, t) {
        for (
          let n = (function UI(e) {
            return Fm(e), Om(e, gi(e, 0, Pe.textEnd));
          })(t);
          n >= 0;
          n = Om(t, n)
        )
          $m(e, xm(t), jI(t));
      }
      function ca(e) {
        Zt(yt, dn, e, !0);
      }
      function dn(e, t) {
        for (
          let n = (function $I(e) {
            return Fm(e), Pm(e, gi(e, 0, Pe.textEnd));
          })(t);
          n >= 0;
          n = Pm(t, n)
        )
          yt(e, xm(t), !0);
      }
      function Zt(e, t, n, r) {
        const i = Y(),
          s = _n(2);
        i.firstUpdatePass && jm(i, null, s, r);
        const o = v();
        if (n !== $ && Ke(o, s, n)) {
          const a = i.data[nt()];
          if (zm(a, r) && !Bm(i, s)) {
            let l = r ? a.classesWithoutHost : a.stylesWithoutHost;
            null !== l && (n = $l(l, n || "")), Oc(i, a, o, n, r);
          } else
            !(function XI(e, t, n, r, i, s, o, a) {
              i === $ && (i = te);
              let l = 0,
                u = 0,
                c = 0 < i.length ? i[0] : null,
                d = 0 < s.length ? s[0] : null;
              for (; null !== c || null !== d; ) {
                const f = l < i.length ? i[l + 1] : void 0,
                  h = u < s.length ? s[u + 1] : void 0;
                let g,
                  p = null;
                c === d
                  ? ((l += 2), (u += 2), f !== h && ((p = d), (g = h)))
                  : null === d || (null !== c && c < d)
                  ? ((l += 2), (p = c))
                  : ((u += 2), (p = d), (g = h)),
                  null !== p && Um(e, t, n, r, p, g, o, a),
                  (c = l < i.length ? i[l] : null),
                  (d = u < s.length ? s[u] : null);
              }
            })(
              i,
              a,
              o,
              o[H],
              o[s + 1],
              (o[s + 1] = (function ZI(e, t, n) {
                if (null == n || "" === n) return te;
                const r = [],
                  i = vt(n);
                if (Array.isArray(i))
                  for (let s = 0; s < i.length; s++) e(r, i[s], !0);
                else if ("object" == typeof i)
                  for (const s in i) i.hasOwnProperty(s) && e(r, s, i[s]);
                else "string" == typeof i && t(r, i);
                return r;
              })(e, t, n)),
              r,
              s
            );
        }
      }
      function Bm(e, t) {
        return t >= e.expandoStartIndex;
      }
      function jm(e, t, n, r) {
        const i = e.data;
        if (null === i[n + 1]) {
          const s = i[nt()],
            o = Bm(e, n);
          zm(s, r) && null === t && !o && (t = !1),
            (t = (function qI(e, t, n, r) {
              const i = (function ou(e) {
                const t = B.lFrame.currentDirectiveIndex;
                return -1 === t ? null : e[t];
              })(e);
              let s = r ? t.residualClasses : t.residualStyles;
              if (null === i)
                0 === (r ? t.classBindings : t.styleBindings) &&
                  ((n = ms((n = Lc(null, e, t, n, r)), t.attrs, r)),
                  (s = null));
              else {
                const o = t.directiveStylingLast;
                if (-1 === o || e[o] !== i)
                  if (((n = Lc(i, e, t, n, r)), null === s)) {
                    let l = (function KI(e, t, n) {
                      const r = n ? t.classBindings : t.styleBindings;
                      if (0 !== Cn(r)) return e[Qt(r)];
                    })(e, t, r);
                    void 0 !== l &&
                      Array.isArray(l) &&
                      ((l = Lc(null, e, t, l[1], r)),
                      (l = ms(l, t.attrs, r)),
                      (function QI(e, t, n, r) {
                        e[Qt(n ? t.classBindings : t.styleBindings)] = r;
                      })(e, t, r, l));
                  } else
                    s = (function YI(e, t, n) {
                      let r;
                      const i = t.directiveEnd;
                      for (let s = 1 + t.directiveStylingLast; s < i; s++)
                        r = ms(r, e[s].hostAttrs, n);
                      return ms(r, t.attrs, n);
                    })(e, t, r);
              }
              return (
                void 0 !== s &&
                  (r ? (t.residualClasses = s) : (t.residualStyles = s)),
                n
              );
            })(i, s, t, r)),
            (function kI(e, t, n, r, i, s) {
              let o = s ? t.classBindings : t.styleBindings,
                a = Qt(o),
                l = Cn(o);
              e[r] = n;
              let c,
                u = !1;
              if (Array.isArray(n)) {
                const d = n;
                (c = d[1]), (null === c || Kr(d, c) > 0) && (u = !0);
              } else c = n;
              if (i)
                if (0 !== l) {
                  const f = Qt(e[a + 1]);
                  (e[r + 1] = Yo(f, a)),
                    0 !== f && (e[f + 1] = cc(e[f + 1], r)),
                    (e[a + 1] = (function xT(e, t) {
                      return (131071 & e) | (t << 17);
                    })(e[a + 1], r));
                } else
                  (e[r + 1] = Yo(a, 0)),
                    0 !== a && (e[a + 1] = cc(e[a + 1], r)),
                    (a = r);
              else
                (e[r + 1] = Yo(l, 0)),
                  0 === a ? (a = r) : (e[l + 1] = cc(e[l + 1], r)),
                  (l = r);
              u && (e[r + 1] = uc(e[r + 1])),
                Nm(e, c, r, !0),
                Nm(e, c, r, !1),
                (function VI(e, t, n, r, i) {
                  const s = i ? e.residualClasses : e.residualStyles;
                  null != s &&
                    "string" == typeof t &&
                    Kr(s, t) >= 0 &&
                    (n[r + 1] = dc(n[r + 1]));
                })(t, c, e, r, s),
                (o = Yo(a, l)),
                s ? (t.classBindings = o) : (t.styleBindings = o);
            })(i, s, t, n, o, r);
        }
      }
      function Lc(e, t, n, r, i) {
        let s = null;
        const o = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < o && ((s = t[a]), (r = ms(r, s.hostAttrs, i)), s !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function ms(e, t, n) {
        const r = n ? 1 : 2;
        let i = -1;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const o = t[s];
            "number" == typeof o
              ? (i = o)
              : i === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                yt(e, o, !!n || t[++s]));
          }
        return void 0 === e ? null : e;
      }
      function $m(e, t, n) {
        yt(e, t, vt(n));
      }
      function Um(e, t, n, r, i, s, o, a) {
        if (!(3 & t.type)) return;
        const l = e.data,
          u = l[a + 1];
        da(
          (function Ng(e) {
            return 1 == (1 & e);
          })(u)
            ? Hm(l, t, n, i, Cn(u), o)
            : void 0
        ) ||
          (da(s) ||
            ((function Rg(e) {
              return 2 == (2 & e);
            })(u) &&
              (s = Hm(l, null, n, i, a, o))),
          (function Jb(e, t, n, r, i) {
            if (t) i ? e.addClass(n, r) : e.removeClass(n, r);
            else {
              let s = -1 === r.indexOf("-") ? void 0 : lt.DashCase;
              null == i
                ? e.removeStyle(n, r, s)
                : ("string" == typeof i &&
                    i.endsWith("!important") &&
                    ((i = i.slice(0, -10)), (s |= lt.Important)),
                  e.setStyle(n, r, i, s));
            }
          })(r, o, wo(nt(), n), i, s));
      }
      function Hm(e, t, n, r, i, s) {
        const o = null === t;
        let a;
        for (; i > 0; ) {
          const l = e[i],
            u = Array.isArray(l),
            c = u ? l[1] : l,
            d = null === c;
          let f = n[i + 1];
          f === $ && (f = d ? te : void 0);
          let h = d ? vu(f, r) : c === r ? f : void 0;
          if ((u && !da(h) && (h = vu(l, r)), da(h) && ((a = h), o))) return a;
          const p = e[i + 1];
          i = o ? Qt(p) : Cn(p);
        }
        if (null !== t) {
          let l = s ? t.residualClasses : t.residualStyles;
          null != l && (a = vu(l, r));
        }
        return a;
      }
      function da(e) {
        return void 0 !== e;
      }
      function zm(e, t) {
        return 0 != (e.flags & (t ? 16 : 32));
      }
      function ge(e, t = "") {
        const n = v(),
          r = Y(),
          i = e + 22,
          s = r.firstCreatePass ? ri(r, i, 1, t, null) : r.data[i],
          o = (n[i] = (function Pu(e, t) {
            return e.createText(t);
          })(n[H], t));
        Bo(r, n, o, s), sn(s, !1);
      }
      function kc(e) {
        return ys("", e, ""), kc;
      }
      function ys(e, t, n) {
        const r = v(),
          i = (function oi(e, t, n, r) {
            return Ke(e, jr(), n) ? t + j(n) + r : $;
          })(r, e, t, n);
        return (
          i !== $ &&
            (function bn(e, t, n) {
              const r = wo(t, e);
              !(function Tp(e, t, n) {
                e.setValue(t, n);
              })(e[H], r, n);
            })(r, nt(), i),
          ys
        );
      }
      const vi = "en-US";
      let fy = vi;
      class mr {}
      class Vy {}
      class By extends mr {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Rc(this));
          const r = ft(t);
          (this._bootstrapComponents = wn(r.bootstrap)),
            (this._r3Injector = wg(
              t,
              n,
              [
                { provide: mr, useValue: this },
                { provide: us, useValue: this.componentFactoryResolver },
              ],
              oe(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class zc extends Vy {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new By(this.moduleType, t);
        }
      }
      class EM extends mr {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new Rc(this)),
            (this.instance = null);
          const i = new og(
            [
              ...t,
              { provide: mr, useValue: this },
              { provide: us, useValue: this.componentFactoryResolver },
            ],
            n || Go(),
            r,
            new Set(["environment"])
          );
          (this.injector = i), i.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function ma(e, t, n = null) {
        return new EM(e, t, n).injector;
      }
      let wM = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = ng(0, n.type),
                i =
                  r.length > 0
                    ? ma([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, i);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = V({
            token: e,
            providedIn: "environment",
            factory: () => new e(I($n)),
          })),
          e
        );
      })();
      function jy(e) {
        e.getStandaloneInjector = (t) =>
          t.get(wM).getOrCreateStandaloneInjector(e);
      }
      function Gc(e, t, n) {
        const r = tt() + e,
          i = v();
        return i[r] === $ ? un(i, r, n ? t.call(n) : t()) : ps(i, r);
      }
      function ya(e, t, n, r) {
        return Ky(v(), tt(), e, t, n, r);
      }
      function qy(e, t, n, r, i, s, o, a, l, u) {
        const c = tt() + e,
          d = v();
        let f = (function xt(e, t, n, r, i, s) {
          const o = hr(e, t, n, r);
          return hr(e, t + 2, i, s) || o;
        })(d, c, n, r, i, s);
        return (function oa(e, t, n, r, i) {
          const s = hr(e, t, n, r);
          return Ke(e, t + 2, i) || s;
        })(d, c + 4, o, a, l) || f
          ? un(
              d,
              c + 7,
              u ? t.call(u, n, r, i, s, o, a, l) : t(n, r, i, s, o, a, l)
            )
          : ps(d, c + 7);
      }
      function Ky(e, t, n, r, i, s) {
        const o = t + n;
        return Ke(e, o, i)
          ? un(e, o + 1, s ? r.call(s, i) : r(i))
          : (function Cs(e, t) {
              const n = e[t];
              return n === $ ? void 0 : n;
            })(e, o + 1);
      }
      function qc(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const st = class HM extends $t {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let i = t,
            s = n || (() => null),
            o = r;
          if (t && "object" == typeof t) {
            const l = t;
            (i = l.next?.bind(l)),
              (s = l.error?.bind(l)),
              (o = l.complete?.bind(l));
          }
          this.__isAsync && ((s = qc(s)), i && (i = qc(i)), o && (o = qc(o)));
          const a = super.subscribe({ next: i, error: s, complete: o });
          return t instanceof De && t.add(a), a;
        }
      };
      function zM() {
        return this._results[fr()]();
      }
      class Kc {
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = fr(),
            r = Kc.prototype;
          r[n] || (r[n] = zM);
        }
        get changes() {
          return this._changes || (this._changes = new st());
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, n) {
          return this._results.reduce(t, n);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, n) {
          const r = this;
          r.dirty = !1;
          const i = mt(t);
          (this._changesDetected = !(function KC(e, t, n) {
            if (e.length !== t.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let i = e[r],
                s = t[r];
              if ((n && ((i = n(i)), (s = n(s))), s !== i)) return !1;
            }
            return !0;
          })(r._results, i, n)) &&
            ((r._results = i),
            (r.length = i.length),
            (r.last = i[this.length - 1]),
            (r.first = i[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let fn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = qM), e;
      })();
      const WM = fn,
        GM = class extends WM {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tViews,
              i = Jo(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            i[17] = this._declarationLView[this._declarationTContainer.index];
            const o = this._declarationLView[19];
            return (
              null !== o && (i[19] = o.createEmbeddedView(r)),
              Dc(r, i, t),
              new ds(i)
            );
          }
        };
      function qM() {
        return va(Ne(), v());
      }
      function va(e, t) {
        return 4 & e.type ? new GM(t, e, Jr(e, t)) : null;
      }
      let Xt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = KM), e;
      })();
      function KM() {
        return rv(Ne(), v());
      }
      const QM = Xt,
        tv = class extends QM {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Jr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Hr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Ro(this._hostTNode, this._hostLView);
            if (Hh(t)) {
              const n = Ur(t, this._hostLView),
                r = $r(t);
              return new Hr(n[1].data[r + 8], n);
            }
            return new Hr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = nv(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            let i, s;
            "number" == typeof r
              ? (i = r)
              : null != r && ((i = r.index), (s = r.injector));
            const o = t.createEmbeddedView(n || {}, s);
            return this.insert(o, i), o;
          }
          createComponent(t, n, r, i, s) {
            const o =
              t &&
              !(function Ki(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (o) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (i = d.projectableNodes),
                (s = d.environmentInjector || d.ngModuleRef);
            }
            const l = o ? t : new fs(re(t)),
              u = r || this.parentInjector;
            if (!s && null == l.ngModule) {
              const f = (o ? u : this.parentInjector).get($n, null);
              f && (s = f);
            }
            const c = l.create(u, i, void 0, s);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              i = r[1];
            if (
              (function fC(e) {
                return Wt(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new tv(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const s = this._adjustIndex(n),
              o = this._lContainer;
            !(function Wb(e, t, n, r) {
              const i = 10 + r,
                s = n.length;
              r > 0 && (n[i - 1][4] = t),
                r < s - 10
                  ? ((t[4] = n[i]), ep(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const o = t[17];
              null !== o &&
                n !== o &&
                (function Gb(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(o, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 64);
            })(i, r, o, s);
            const a = Vu(s, o),
              l = r[H],
              u = Vo(l, o[7]);
            return (
              null !== u &&
                (function Ub(e, t, n, r, i, s) {
                  (r[0] = i), (r[6] = t), ss(e, r, n, 1, i, s);
                })(i, o[6], l, r, u, a),
              t.attachToViewContainerRef(),
              ep(Qc(o), s, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = nv(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Fu(this._lContainer, n);
            r && (Po(Qc(this._lContainer), n), Mp(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Fu(this._lContainer, n);
            return r && null != Po(Qc(this._lContainer), n) ? new ds(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function nv(e) {
        return e[8];
      }
      function Qc(e) {
        return e[8] || (e[8] = []);
      }
      function rv(e, t) {
        let n;
        const r = t[e.index];
        if (Wt(r)) n = r;
        else {
          let i;
          if (8 & e.type) i = Me(r);
          else {
            const s = t[H];
            i = s.createComment("");
            const o = pt(e, t);
            lr(
              s,
              Vo(s, o),
              i,
              (function Yb(e, t) {
                return e.nextSibling(t);
              })(s, o),
              !1
            );
          }
          (t[e.index] = n = Xg(r, t, i, e)), ta(t, n);
        }
        return new tv(n, e, t);
      }
      class Yc {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Yc(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Zc {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const n = t.queries;
          if (null !== n) {
            const r =
                null !== t.contentQueries ? t.contentQueries[0] : n.length,
              i = [];
            for (let s = 0; s < r; s++) {
              const o = n.getByIndex(s);
              i.push(this.queries[o.indexInDeclarationView].clone());
            }
            return new Zc(i);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let n = 0; n < this.queries.length; n++)
            null !== uv(t, n).matches && this.queries[n].setDirty();
        }
      }
      class iv {
        constructor(t, n, r = null) {
          (this.predicate = t), (this.flags = n), (this.read = r);
        }
      }
      class Xc {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(t, n);
        }
        elementEnd(t) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementEnd(t);
        }
        embeddedTView(t) {
          let n = null;
          for (let r = 0; r < this.length; r++) {
            const i = null !== n ? n.length : 0,
              s = this.getByIndex(r).embeddedTView(t, i);
            s &&
              ((s.indexInDeclarationView = r),
              null !== n ? n.push(s) : (n = [s]));
          }
          return null !== n ? new Xc(n) : null;
        }
        template(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(t, n);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Jc {
        constructor(t, n = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = n);
        }
        elementStart(t, n) {
          this.isApplyingToNode(n) && this.matchTNode(t, n);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, n) {
          this.elementStart(t, n);
        }
        embeddedTView(t, n) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, n),
              new Jc(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const n = this._declarationNodeIndex;
            let r = t.parent;
            for (; null !== r && 8 & r.type && r.index !== n; ) r = r.parent;
            return n === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, n) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let i = 0; i < r.length; i++) {
              const s = r[i];
              this.matchTNodeWithReadOption(t, n, XM(n, s)),
                this.matchTNodeWithReadOption(t, n, xo(n, t, s, !1, !1));
            }
          else
            r === fn
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, xo(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const i = this.metadata.read;
            if (null !== i)
              if (i === qt || i === Xt || (i === fn && 4 & n.type))
                this.addMatch(n.index, -2);
              else {
                const s = xo(n, t, i, !1, !1);
                null !== s && this.addMatch(n.index, s);
              }
            else this.addMatch(n.index, r);
          }
        }
        addMatch(t, n) {
          null === this.matches
            ? (this.matches = [t, n])
            : this.matches.push(t, n);
        }
      }
      function XM(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function eA(e, t, n, r) {
        return -1 === n
          ? (function JM(e, t) {
              return 11 & e.type ? Jr(e, t) : 4 & e.type ? va(e, t) : null;
            })(t, e)
          : -2 === n
          ? (function tA(e, t, n) {
              return n === qt
                ? Jr(t, e)
                : n === fn
                ? va(t, e)
                : n === Xt
                ? rv(t, e)
                : void 0;
            })(e, t, r)
          : Wi(e, e[1], n, t);
      }
      function sv(e, t, n, r) {
        const i = t[19].queries[r];
        if (null === i.matches) {
          const s = e.data,
            o = n.matches,
            a = [];
          for (let l = 0; l < o.length; l += 2) {
            const u = o[l];
            a.push(u < 0 ? null : eA(t, s[u], o[l + 1], n.metadata.read));
          }
          i.matches = a;
        }
        return i.matches;
      }
      function ed(e, t, n, r) {
        const i = e.queries.getByIndex(n),
          s = i.matches;
        if (null !== s) {
          const o = sv(e, t, i, n);
          for (let a = 0; a < s.length; a += 2) {
            const l = s[a];
            if (l > 0) r.push(o[a / 2]);
            else {
              const u = s[a + 1],
                c = t[-l];
              for (let d = 10; d < c.length; d++) {
                const f = c[d];
                f[17] === f[3] && ed(f[1], f, u, r);
              }
              if (null !== c[9]) {
                const d = c[9];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  ed(h[1], h, u, r);
                }
              }
            }
          }
        }
        return r;
      }
      function zn(e) {
        const t = v(),
          n = Y(),
          r = Ph();
        au(r + 1);
        const i = uv(n, r);
        if (
          e.dirty &&
          (function dC(e) {
            return 4 == (4 & e[2]);
          })(t) ===
            (2 == (2 & i.metadata.flags))
        ) {
          if (null === i.matches) e.reset([]);
          else {
            const s = i.crossesNgTemplate ? ed(n, t, r, []) : sv(n, t, i, r);
            e.reset(s, zS), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function yr(e, t, n, r) {
        const i = Y();
        if (i.firstCreatePass) {
          const s = Ne();
          lv(i, new iv(t, n, r), s.index),
            (function rA(e, t) {
              const n = e.contentQueries || (e.contentQueries = []);
              t !== (n.length ? n[n.length - 1] : -1) &&
                n.push(e.queries.length - 1, t);
            })(i, e),
            2 == (2 & n) && (i.staticContentQueries = !0);
        }
        av(i, v(), n);
      }
      function Wn() {
        return (function nA(e, t) {
          return e[19].queries[t].queryList;
        })(v(), Ph());
      }
      function av(e, t, n) {
        const r = new Kc(4 == (4 & n));
        Hg(e, t, r, r.destroy),
          null === t[19] && (t[19] = new Zc()),
          t[19].queries.push(new Yc(r));
      }
      function lv(e, t, n) {
        null === e.queries && (e.queries = new Xc()),
          e.queries.track(new Jc(t, n));
      }
      function uv(e, t) {
        return e.queries.getByIndex(t);
      }
      function cv(e, t) {
        return va(e, t);
      }
      function Da(...e) {}
      const Ea = new k("Application Initializer");
      let wa = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = Da),
              (this.reject = Da),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, i) => {
                (this.resolve = r), (this.reject = i);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let i = 0; i < this.appInits.length; i++) {
                const s = this.appInits[i]();
                if (ua(s)) n.push(s);
                else if (ym(s)) {
                  const o = new Promise((a, l) => {
                    s.subscribe({ complete: a, error: l });
                  });
                  n.push(o);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((i) => {
                this.reject(i);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(Ea, 8));
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Ts = new k("AppId", {
        providedIn: "root",
        factory: function Av() {
          return `${sd()}${sd()}${sd()}`;
        },
      });
      function sd() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Rv = new k("Platform Initializer"),
        Nv = new k("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        xv = new k("appBootstrapListener"),
        Pv = new k("AnimationModuleType");
      let CA = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const Sn = new k("LocaleId", {
        providedIn: "root",
        factory: () =>
          be(Sn, x.Optional | x.SkipSelf) ||
          (function bA() {
            return (typeof $localize < "u" && $localize.locale) || vi;
          })(),
      });
      class TA {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let od = (() => {
        class e {
          compileModuleSync(n) {
            return new zc(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              s = wn(ft(n).declarations).reduce((o, a) => {
                const l = re(a);
                return l && o.push(new fs(l)), o;
              }, []);
            return new TA(r, s);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const AA = (() => Promise.resolve(0))();
      function ad(e) {
        typeof Zone > "u"
          ? AA.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class Se {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new st(!1)),
            (this.onMicrotaskEmpty = new st(!1)),
            (this.onStable = new st(!1)),
            (this.onError = new st(!1)),
            typeof Zone > "u")
          )
            throw new D(908, !1);
          Zone.assertZonePatched();
          const i = this;
          if (
            ((i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.AsyncStackTaggingZoneSpec)
          ) {
            const s = Zone.AsyncStackTaggingZoneSpec;
            i._inner = i._inner.fork(new s("Angular"));
          }
          Zone.TaskTrackingZoneSpec &&
            (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !r && n),
            (i.shouldCoalesceRunChangeDetection = r),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function RA() {
              let e = le.requestAnimationFrame,
                t = le.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function PA(e) {
              const t = () => {
                !(function xA(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(le, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                ud(e),
                                (e.isCheckStableRunning = !0),
                                ld(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    ud(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, i, s, o, a) => {
                  try {
                    return Lv(e), n.invokeTask(i, s, o, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === s.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      kv(e);
                  }
                },
                onInvoke: (n, r, i, s, o, a, l) => {
                  try {
                    return Lv(e), n.invoke(i, s, o, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), kv(e);
                  }
                },
                onHasTask: (n, r, i, s) => {
                  n.hasTask(i, s),
                    r === i &&
                      ("microTask" == s.change
                        ? ((e._hasPendingMicrotasks = s.microTask),
                          ud(e),
                          ld(e))
                        : "macroTask" == s.change &&
                          (e.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (n, r, i, s) => (
                  n.handleError(i, s),
                  e.runOutsideAngular(() => e.onError.emit(s)),
                  !1
                ),
              });
            })(i);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Se.isInAngularZone()) throw new D(909, !1);
        }
        static assertNotInAngularZone() {
          if (Se.isInAngularZone()) throw new D(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, i) {
          const s = this._inner,
            o = s.scheduleEventTask("NgZoneEvent: " + i, t, NA, Da, Da);
          try {
            return s.runTask(o, n, r);
          } finally {
            s.cancelTask(o);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const NA = {};
      function ld(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function ud(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function Lv(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function kv(e) {
        e._nesting--, ld(e);
      }
      class OA {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new st()),
            (this.onMicrotaskEmpty = new st()),
            (this.onStable = new st()),
            (this.onError = new st());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, i) {
          return t.apply(n, r);
        }
      }
      const Vv = new k(""),
        Ca = new k("");
      let fd,
        cd = (() => {
          class e {
            constructor(n, r, i) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                fd ||
                  ((function FA(e) {
                    fd = e;
                  })(i),
                  i.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Se.assertNotInAngularZone(),
                        ad(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                ad(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, i) {
              let s = -1;
              r &&
                r > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (o) => o.timeoutId !== s
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: s, updateCb: i });
            }
            whenStable(n, r, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, i), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, i) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(Se), I(dd), I(Ca));
            }),
            (e.ɵprov = V({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        dd = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return fd?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = V({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        Gn = null;
      const Bv = new k("AllowMultipleToken"),
        hd = new k("PlatformDestroyListeners");
      class jv {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function Uv(e, t, n = []) {
        const r = `Platform: ${t}`,
          i = new k(r);
        return (s = []) => {
          let o = pd();
          if (!o || o.injector.get(Bv, !1)) {
            const a = [...n, ...s, { provide: i, useValue: !0 }];
            e
              ? e(a)
              : (function VA(e) {
                  if (Gn && !Gn.get(Bv, !1)) throw new D(400, !1);
                  Gn = e;
                  const t = e.get(zv);
                  (function $v(e) {
                    const t = e.get(Rv, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function Hv(e = [], t) {
                    return Nt.create({
                      name: t,
                      providers: [
                        { provide: Zu, useValue: "platform" },
                        { provide: hd, useValue: new Set([() => (Gn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function jA(e) {
            const t = pd();
            if (!t) throw new D(401, !1);
            return t;
          })();
        };
      }
      function pd() {
        return Gn?.get(zv) ?? null;
      }
      let zv = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const i = (function Gv(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new OA()
                      : ("zone.js" === e ? void 0 : e) || new Se(t)),
                  n
                );
              })(
                r?.ngZone,
                (function Wv(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              s = [{ provide: Se, useValue: i }];
            return i.run(() => {
              const o = Nt.create({
                  providers: s,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(o),
                l = a.injector.get(ei, null);
              if (!l) throw new D(402, !1);
              return (
                i.runOutsideAngular(() => {
                  const u = i.onError.subscribe({
                    next: (c) => {
                      l.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    ba(this._modules, a), u.unsubscribe();
                  });
                }),
                (function qv(e, t, n) {
                  try {
                    const r = n();
                    return ua(r)
                      ? r.catch((i) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(i)), i)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(l, i, () => {
                  const u = a.injector.get(wa);
                  return (
                    u.runInitializers(),
                    u.donePromise.then(
                      () => (
                        (function hy(e) {
                          dt(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (fy = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(Sn, vi) || vi),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const i = Kv({}, r);
            return (function LA(e, t, n) {
              const r = new zc(n);
              return Promise.resolve(r);
            })(0, 0, n).then((s) => this.bootstrapModuleFactory(s, i));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Is);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((i) => r.bootstrap(i));
            else {
              if (!n.instance.ngDoBootstrap) throw new D(403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new D(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(hd, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(Nt));
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function Kv(e, t) {
        return Array.isArray(t) ? t.reduce(Kv, e) : { ...e, ...t };
      }
      let Is = (() => {
        class e {
          constructor(n, r, i) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = i),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const s = new Ce((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              o = new Ce((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    Se.assertNotInAngularZone(),
                      ad(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const u = this._zone.onUnstable.subscribe(() => {
                  Se.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), u.unsubscribe();
                };
              });
            this.isStable = (function Tw(...e) {
              let t = Number.POSITIVE_INFINITY,
                n = null,
                r = e[e.length - 1];
              return (
                so(r)
                  ? ((n = e.pop()),
                    e.length > 1 &&
                      "number" == typeof e[e.length - 1] &&
                      (t = e.pop()))
                  : "number" == typeof r && (t = e.pop()),
                null === n && 1 === e.length && e[0] instanceof Ce
                  ? e[0]
                  : Pr(t)(Vl(e, n))
              );
            })(
              s,
              o.pipe(
                (function Fw() {
                  return (e) =>
                    co()(
                      (function xw(e, t) {
                        return function (r) {
                          let i;
                          if (
                            ((i =
                              "function" == typeof e
                                ? e
                                : function () {
                                    return e;
                                  }),
                            "function" == typeof t)
                          )
                            return r.lift(new Pw(i, t));
                          const s = Object.create(r, Aw);
                          return (s.source = r), (s.subjectFactory = i), s;
                        };
                      })(Ow)(e)
                    );
                })()
              )
            );
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const i = n instanceof lg;
            if (!this._injector.get(wa).done)
              throw (
                (!i &&
                  (function Fr(e) {
                    const t = re(e) || Je(e) || et(e);
                    return null !== t && t.standalone;
                  })(n),
                new D(405, false))
              );
            let o;
            (o = i ? n : this._injector.get(us).resolveComponentFactory(n)),
              this.componentTypes.push(o.componentType);
            const a = (function kA(e) {
                return e.isBoundToModule;
              })(o)
                ? void 0
                : this._injector.get(mr),
              u = o.create(Nt.NULL, [], r || o.selector, a),
              c = u.location.nativeElement,
              d = u.injector.get(Vv, null);
            return (
              d?.registerApplication(c),
              u.onDestroy(() => {
                this.detachView(u.hostView),
                  ba(this.components, u),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(u),
              u
            );
          }
          tick() {
            if (this._runningTick) throw new D(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            ba(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(xv, [])
                .concat(this._bootstrapListeners)
                .forEach((i) => i(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => ba(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new D(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(Se), I($n), I(ei));
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function ba(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Yv = !0,
        Sa = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = HA), e;
        })();
      function HA(e) {
        return (function zA(e, t, n) {
          if (Do(e) && !n) {
            const r = gt(e.index, t);
            return new ds(r, r);
          }
          return 47 & e.type ? new ds(t[16], t) : null;
        })(Ne(), v(), 16 == (16 & e));
      }
      class t_ {
        constructor() {}
        supports(t) {
          return hs(t);
        }
        create(t) {
          return new YA(t);
        }
      }
      const QA = (e, t) => t;
      class YA {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || QA);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            i = 0,
            s = null;
          for (; n || r; ) {
            const o = !r || (n && n.currentIndex < r_(r, i, s)) ? n : r,
              a = r_(o, i, s),
              l = o.currentIndex;
            if (o === r) i--, (r = r._nextRemoved);
            else if (((n = n._next), null == o.previousIndex)) i++;
            else {
              s || (s = []);
              const u = a - i,
                c = l - i;
              if (u != c) {
                for (let f = 0; f < u; f++) {
                  const h = f < s.length ? s[f] : (s[f] = 0),
                    p = h + f;
                  c <= p && p < u && (s[f] = h + 1);
                }
                s[o.previousIndex] = c - u;
              }
            }
            a !== l && t(o, a, l);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !hs(t))) throw new D(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let i,
            s,
            o,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (s = t[a]),
                (o = this._trackByFn(a, s)),
                null !== n && Object.is(n.trackById, o)
                  ? (r && (n = this._verifyReinsertion(n, s, o, a)),
                    Object.is(n.item, s) || this._addIdentityChange(n, s))
                  : ((n = this._mismatch(n, s, o, a)), (r = !0)),
                (n = n._next);
          } else
            (i = 0),
              (function II(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[fr()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (o = this._trackByFn(i, a)),
                  null !== n && Object.is(n.trackById, o)
                    ? (r && (n = this._verifyReinsertion(n, a, o, i)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, o, i)), (r = !0)),
                  (n = n._next),
                  i++;
              }),
              (this.length = i);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, i) {
          let s;
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, s, i))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, i))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, s, i))
              : (t = this._addAfter(new ZA(n, r), s, i)),
            t
          );
        }
        _verifyReinsertion(t, n, r, i) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, i))
              : t.currentIndex != i &&
                ((t.currentIndex = i), this._addToMoves(t, i)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const i = t._prevRemoved,
            s = t._nextRemoved;
          return (
            null === i ? (this._removalsHead = s) : (i._nextRemoved = s),
            null === s ? (this._removalsTail = i) : (s._prevRemoved = i),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const i = null === n ? this._itHead : n._next;
          return (
            (t._next = i),
            (t._prev = n),
            null === i ? (this._itTail = t) : (i._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new n_()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new n_()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class ZA {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class XA {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class n_ {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new XA()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const i = this.map.get(t);
          return i ? i.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function r_(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let i = 0;
        return n && r < n.length && (i = n[r]), r + t + i;
      }
      class i_ {
        constructor() {}
        supports(t) {
          return t instanceof Map || xc(t);
        }
        create() {
          return new JA();
        }
      }
      class JA {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || xc(t))) throw new D(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, i) => {
              if (n && n.key === i)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const s = this._getOrCreateRecordForKey(i, r);
                n = this._insertBeforeOrAppend(n, s);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const i = this._records.get(t);
            this._maybeAddToChanges(i, n);
            const s = i._prev,
              o = i._next;
            return (
              s && (s._next = o),
              o && (o._prev = s),
              (i._next = null),
              (i._prev = null),
              i
            );
          }
          const r = new eR(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class eR {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function s_() {
        return new Ma([new t_()]);
      }
      let Ma = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || s_()),
              deps: [[e, new es(), new Ji()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (null != r) return r;
            throw new D(901, !1);
          }
        }
        return (e.ɵprov = V({ token: e, providedIn: "root", factory: s_ })), e;
      })();
      function o_() {
        return new Ms([new i_()]);
      }
      let Ms = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || o_()),
              deps: [[e, new es(), new Ji()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (r) return r;
            throw new D(901, !1);
          }
        }
        return (e.ɵprov = V({ token: e, providedIn: "root", factory: o_ })), e;
      })();
      const rR = Uv(null, "core", []);
      let iR = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(Is));
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({})),
            e
          );
        })(),
        Aa = null;
      function qn() {
        return Aa;
      }
      const Le = new k("DocumentToken");
      let _d = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = V({
            token: e,
            factory: function () {
              return (function lR() {
                return I(a_);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const uR = new k("Location Initialized");
      let a_ = (() => {
        class e extends _d {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return qn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = qn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = qn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(n) {
            this.location.pathname = n;
          }
          pushState(n, r, i) {
            l_() ? this._history.pushState(n, r, i) : (this.location.hash = i);
          }
          replaceState(n, r, i) {
            l_()
              ? this._history.replaceState(n, r, i)
              : (this.location.hash = i);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(Le));
          }),
          (e.ɵprov = V({
            token: e,
            factory: function () {
              return (function cR() {
                return new a_(I(Le));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function l_() {
        return !!window.history.pushState;
      }
      function Dd(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function u_(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function In(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let _r = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = V({
            token: e,
            factory: function () {
              return be(d_);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const c_ = new k("appBaseHref");
      let d_ = (() => {
          class e extends _r {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  be(Le).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Dd(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  In(this._platformLocation.search),
                i = this._platformLocation.hash;
              return i && n ? `${r}${i}` : r;
            }
            pushState(n, r, i, s) {
              const o = this.prepareExternalUrl(i + In(s));
              this._platformLocation.pushState(n, r, o);
            }
            replaceState(n, r, i, s) {
              const o = this.prepareExternalUrl(i + In(s));
              this._platformLocation.replaceState(n, r, o);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(_d), I(c_, 8));
            }),
            (e.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        dR = (() => {
          class e extends _r {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Dd(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, i, s) {
              let o = this.prepareExternalUrl(i + In(s));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, o);
            }
            replaceState(n, r, i, s) {
              let o = this.prepareExternalUrl(i + In(s));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, o);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(_d), I(c_, 8));
            }),
            (e.ɵprov = V({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Ed = (() => {
          class e {
            constructor(n) {
              (this._subject = new st()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._baseHref = u_(f_(r))),
                this._locationStrategy.onPopState((i) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: i.state,
                    type: i.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + In(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function hR(e, t) {
                  return e && t.startsWith(e) ? t.substring(e.length) : t;
                })(this._baseHref, f_(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", i = null) {
              this._locationStrategy.pushState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + In(r)),
                  i
                );
            }
            replaceState(n, r = "", i = null) {
              this._locationStrategy.replaceState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + In(r)),
                  i
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((i) => i(n, r));
            }
            subscribe(n, r, i) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: i,
              });
            }
          }
          return (
            (e.normalizeQueryParams = In),
            (e.joinWithSlash = Dd),
            (e.stripTrailingSlash = u_),
            (e.ɵfac = function (n) {
              return new (n || e)(I(_r));
            }),
            (e.ɵprov = V({
              token: e,
              factory: function () {
                return (function fR() {
                  return new Ed(I(_r));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function f_(e) {
        return e.replace(/\/index.html$/, "");
      }
      let Ba = (() => {
        class e {
          constructor(n, r, i, s) {
            (this._iterableDiffers = n),
              (this._keyValueDiffers = r),
              (this._ngEl = i),
              (this._renderer = s),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._initialClasses = []),
              (this._rawClass = null);
          }
          set klass(n) {
            this._removeClasses(this._initialClasses),
              (this._initialClasses =
                "string" == typeof n ? n.split(/\s+/) : []),
              this._applyClasses(this._initialClasses),
              this._applyClasses(this._rawClass);
          }
          set ngClass(n) {
            this._removeClasses(this._rawClass),
              this._applyClasses(this._initialClasses),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._rawClass = "string" == typeof n ? n.split(/\s+/) : n),
              this._rawClass &&
                (hs(this._rawClass)
                  ? (this._iterableDiffer = this._iterableDiffers
                      .find(this._rawClass)
                      .create())
                  : (this._keyValueDiffer = this._keyValueDiffers
                      .find(this._rawClass)
                      .create()));
          }
          ngDoCheck() {
            if (this._iterableDiffer) {
              const n = this._iterableDiffer.diff(this._rawClass);
              n && this._applyIterableChanges(n);
            } else if (this._keyValueDiffer) {
              const n = this._keyValueDiffer.diff(this._rawClass);
              n && this._applyKeyValueChanges(n);
            }
          }
          _applyKeyValueChanges(n) {
            n.forEachAddedItem((r) => this._toggleClass(r.key, r.currentValue)),
              n.forEachChangedItem((r) =>
                this._toggleClass(r.key, r.currentValue)
              ),
              n.forEachRemovedItem((r) => {
                r.previousValue && this._toggleClass(r.key, !1);
              });
          }
          _applyIterableChanges(n) {
            n.forEachAddedItem((r) => {
              if ("string" != typeof r.item)
                throw new Error(
                  `NgClass can only toggle CSS classes expressed as strings, got ${oe(
                    r.item
                  )}`
                );
              this._toggleClass(r.item, !0);
            }),
              n.forEachRemovedItem((r) => this._toggleClass(r.item, !1));
          }
          _applyClasses(n) {
            n &&
              (Array.isArray(n) || n instanceof Set
                ? n.forEach((r) => this._toggleClass(r, !0))
                : Object.keys(n).forEach((r) => this._toggleClass(r, !!n[r])));
          }
          _removeClasses(n) {
            n &&
              (Array.isArray(n) || n instanceof Set
                ? n.forEach((r) => this._toggleClass(r, !1))
                : Object.keys(n).forEach((r) => this._toggleClass(r, !1)));
          }
          _toggleClass(n, r) {
            (n = n.trim()) &&
              n.split(/\s+/g).forEach((i) => {
                r
                  ? this._renderer.addClass(this._ngEl.nativeElement, i)
                  : this._renderer.removeClass(this._ngEl.nativeElement, i);
              });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(Ma), T(Ms), T(qt), T(qo));
          }),
          (e.ɵdir = Be({
            type: e,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            standalone: !0,
          })),
          e
        );
      })();
      class XR {
        constructor(t, n, r, i) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = i);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let ja = (() => {
        class e {
          constructor(n, r, i) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = i),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((i, s, o) => {
              if (null == i.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new XR(i.item, this._ngForOf, -1, -1),
                  null === o ? void 0 : o
                );
              else if (null == o) r.remove(null === s ? void 0 : s);
              else if (null !== s) {
                const a = r.get(s);
                r.move(a, o), C_(a, i);
              }
            });
            for (let i = 0, s = r.length; i < s; i++) {
              const a = r.get(i).context;
              (a.index = i), (a.count = s), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((i) => {
              C_(r.get(i.currentIndex), i);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(Xt), T(fn), T(Ma));
          }),
          (e.ɵdir = Be({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function C_(e, t) {
        e.context.$implicit = t.item;
      }
      let $a = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new eN()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            b_("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            b_("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(Xt), T(fn));
          }),
          (e.ɵdir = Be({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          e
        );
      })();
      class eN {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function b_(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${oe(t)}'.`
          );
      }
      let Pd = (() => {
          class e {
            constructor(n, r, i) {
              (this._ngEl = n),
                (this._differs = r),
                (this._renderer = i),
                (this._ngStyle = null),
                (this._differ = null);
            }
            set ngStyle(n) {
              (this._ngStyle = n),
                !this._differ &&
                  n &&
                  (this._differ = this._differs.find(n).create());
            }
            ngDoCheck() {
              if (this._differ) {
                const n = this._differ.diff(this._ngStyle);
                n && this._applyChanges(n);
              }
            }
            _setStyle(n, r) {
              const [i, s] = n.split("."),
                o = -1 === i.indexOf("-") ? void 0 : lt.DashCase;
              null != r
                ? this._renderer.setStyle(
                    this._ngEl.nativeElement,
                    i,
                    s ? `${r}${s}` : r,
                    o
                  )
                : this._renderer.removeStyle(this._ngEl.nativeElement, i, o);
            }
            _applyChanges(n) {
              n.forEachRemovedItem((r) => this._setStyle(r.key, null)),
                n.forEachAddedItem((r) =>
                  this._setStyle(r.key, r.currentValue)
                ),
                n.forEachChangedItem((r) =>
                  this._setStyle(r.key, r.currentValue)
                );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(qt), T(Ms), T(qo));
            }),
            (e.ɵdir = Be({
              type: e,
              selectors: [["", "ngStyle", ""]],
              inputs: { ngStyle: "ngStyle" },
              standalone: !0,
            })),
            e
          );
        })(),
        Od = (() => {
          class e {
            constructor(n) {
              (this._viewContainerRef = n),
                (this._viewRef = null),
                (this.ngTemplateOutletContext = null),
                (this.ngTemplateOutlet = null),
                (this.ngTemplateOutletInjector = null);
            }
            ngOnChanges(n) {
              if (n.ngTemplateOutlet || n.ngTemplateOutletInjector) {
                const r = this._viewContainerRef;
                if (
                  (this._viewRef && r.remove(r.indexOf(this._viewRef)),
                  this.ngTemplateOutlet)
                ) {
                  const {
                    ngTemplateOutlet: i,
                    ngTemplateOutletContext: s,
                    ngTemplateOutletInjector: o,
                  } = this;
                  this._viewRef = r.createEmbeddedView(
                    i,
                    s,
                    o ? { injector: o } : void 0
                  );
                } else this._viewRef = null;
              } else
                this._viewRef &&
                  n.ngTemplateOutletContext &&
                  this.ngTemplateOutletContext &&
                  (this._viewRef.context = this.ngTemplateOutletContext);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(Xt));
            }),
            (e.ɵdir = Be({
              type: e,
              selectors: [["", "ngTemplateOutlet", ""]],
              inputs: {
                ngTemplateOutletContext: "ngTemplateOutletContext",
                ngTemplateOutlet: "ngTemplateOutlet",
                ngTemplateOutletInjector: "ngTemplateOutletInjector",
              },
              standalone: !0,
              features: [kn],
            })),
            e
          );
        })(),
        Kn = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({})),
            e
          );
        })();
      let MN = (() => {
        class e {}
        return (
          (e.ɵprov = V({
            token: e,
            providedIn: "root",
            factory: () => new AN(I(Le), window),
          })),
          e
        );
      })();
      class AN {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function RN(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let i = r.currentNode;
              for (; i; ) {
                const s = i.shadowRoot;
                if (s) {
                  const o =
                    s.getElementById(t) || s.querySelector(`[name="${t}"]`);
                  if (o) return o;
                }
                i = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            i = n.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(r - s[0], i - s[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              M_(this.window.history) ||
              M_(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function M_(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class Bd extends class ix extends class aR {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function oR(e) {
            Aa || (Aa = e);
          })(new Bd());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function sx() {
            return (
              (xs = xs || document.querySelector("base")),
              xs ? xs.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function ox(e) {
                (za = za || document.createElement("a")),
                  za.setAttribute("href", e);
                const t = za.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          xs = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function YR(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [i, s] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (i.trim() === t) return decodeURIComponent(s);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let za,
        xs = null;
      const P_ = new k("TRANSITION_ID"),
        lx = [
          {
            provide: Ea,
            useFactory: function ax(e, t, n) {
              return () => {
                n.get(wa).donePromise.then(() => {
                  const r = qn(),
                    i = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let s = 0; s < i.length; s++) r.remove(i[s]);
                });
              };
            },
            deps: [P_, Le, Nt],
            multi: !0,
          },
        ];
      let cx = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Wa = new k("EventManagerPlugins");
      let Ga = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((i) => (i.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, i) {
            return this._findPluginFor(r).addEventListener(n, r, i);
          }
          addGlobalEventListener(n, r, i) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, i);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const i = this._plugins;
            for (let s = 0; s < i.length; s++) {
              const o = i[s];
              if (o.supports(n)) return this._eventNameToPlugin.set(n, o), o;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(Wa), I(Se));
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class O_ {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const i = qn().getGlobalEventTarget(this._doc, t);
          if (!i)
            throw new Error(`Unsupported event target ${i} for event ${n}`);
          return this.addEventListener(i, n, r);
        }
      }
      let F_ = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((i) => {
                this._stylesSet.has(i) || (this._stylesSet.add(i), r.add(i));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = V({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Ps = (() => {
          class e extends F_ {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, i) {
              n.forEach((s) => {
                const o = this._doc.createElement("style");
                (o.textContent = s), i.push(r.appendChild(o));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(L_), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, i) => {
                this._addStylesToHost(n, i, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(L_));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(Le));
            }),
            (e.ɵprov = V({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function L_(e) {
        qn().remove(e);
      }
      const jd = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        $d = /%COMP%/g;
      function qa(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let i = t[r];
          Array.isArray(i) ? qa(e, i, n) : ((i = i.replace($d, e)), n.push(i));
        }
        return n;
      }
      function B_(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Ka = (() => {
        class e {
          constructor(n, r, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Ud(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case Ht.Emulated: {
                let i = this.rendererByCompId.get(r.id);
                return (
                  i ||
                    ((i = new mx(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, i)),
                  i.applyToHost(n),
                  i
                );
              }
              case 1:
              case Ht.ShadowDom:
                return new yx(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const i = qa(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(i),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(Ga), I(Ps), I(Ts));
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Ud {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(jd[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          ($_(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && ($_(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, i) {
          if (i) {
            n = i + ":" + n;
            const s = jd[i];
            s ? t.setAttributeNS(s, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const i = jd[r];
            i ? t.removeAttributeNS(i, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, i) {
          i & (lt.DashCase | lt.Important)
            ? t.style.setProperty(n, r, i & lt.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & lt.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, B_(r))
            : this.eventManager.addEventListener(t, n, B_(r));
        }
      }
      function $_(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class mx extends Ud {
        constructor(t, n, r, i) {
          super(t), (this.component = r);
          const s = qa(i + "-" + r.id, r.styles, []);
          n.addStyles(s),
            (this.contentAttr = (function hx(e) {
              return "_ngcontent-%COMP%".replace($d, e);
            })(i + "-" + r.id)),
            (this.hostAttr = (function px(e) {
              return "_nghost-%COMP%".replace($d, e);
            })(i + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class yx extends Ud {
        constructor(t, n, r, i) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = qa(i.id, i.styles, []);
          for (let o = 0; o < s.length; o++) {
            const a = document.createElement("style");
            (a.textContent = s[o]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let vx = (() => {
        class e extends O_ {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, i) {
            return (
              n.addEventListener(r, i, !1),
              () => this.removeEventListener(n, r, i)
            );
          }
          removeEventListener(n, r, i) {
            return n.removeEventListener(r, i);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(Le));
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const U_ = ["alt", "control", "meta", "shift"],
        _x = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        Dx = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let Ex = (() => {
        class e extends O_ {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, i) {
            const s = e.parseEventName(r),
              o = e.eventCallback(s.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => qn().onAndCancel(n, s.domEventName, o));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              i = r.shift();
            if (0 === r.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const s = e._normalizeKey(r.pop());
            let o = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (o = "code.")),
              U_.forEach((u) => {
                const c = r.indexOf(u);
                c > -1 && (r.splice(c, 1), (o += u + "."));
              }),
              (o += s),
              0 != r.length || 0 === s.length)
            )
              return null;
            const l = {};
            return (l.domEventName = i), (l.fullKey = o), l;
          }
          static matchEventFullKeyCode(n, r) {
            let i = _x[n.key] || n.key,
              s = "";
            return (
              r.indexOf("code.") > -1 && ((i = n.code), (s = "code.")),
              !(null == i || !i) &&
                ((i = i.toLowerCase()),
                " " === i ? (i = "space") : "." === i && (i = "dot"),
                U_.forEach((o) => {
                  o !== i && (0, Dx[o])(n) && (s += o + ".");
                }),
                (s += i),
                s === r)
            );
          }
          static eventCallback(n, r, i) {
            return (s) => {
              e.matchEventFullKeyCode(s, n) && i.runGuarded(() => r(s));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(Le));
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const z_ = [
          { provide: Nv, useValue: "browser" },
          {
            provide: Rv,
            useValue: function wx() {
              Bd.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Le,
            useFactory: function bx() {
              return (
                (function rS(e) {
                  Hu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ],
        Sx = Uv(rR, "browser", z_),
        W_ = new k(""),
        G_ = [
          {
            provide: Ca,
            useClass: class ux {
              addToWindow(t) {
                (le.getAngularTestability = (r, i = !0) => {
                  const s = t.findTestabilityInTree(r, i);
                  if (null == s)
                    throw new Error("Could not find testability for element.");
                  return s;
                }),
                  (le.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (le.getAllAngularRootElements = () => t.getAllRootElements()),
                  le.frameworkStabilizers || (le.frameworkStabilizers = []),
                  le.frameworkStabilizers.push((r) => {
                    const i = le.getAllAngularTestabilities();
                    let s = i.length,
                      o = !1;
                    const a = function (l) {
                      (o = o || l), s--, 0 == s && r(o);
                    };
                    i.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? qn().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Vv, useClass: cd, deps: [Se, dd, Ca] },
          { provide: cd, useClass: cd, deps: [Se, dd, Ca] },
        ],
        q_ = [
          { provide: Zu, useValue: "root" },
          {
            provide: ei,
            useFactory: function Cx() {
              return new ei();
            },
            deps: [],
          },
          { provide: Wa, useClass: vx, multi: !0, deps: [Le, Se, Nv] },
          { provide: Wa, useClass: Ex, multi: !0, deps: [Le] },
          { provide: Ka, useClass: Ka, deps: [Ga, Ps, Ts] },
          { provide: cs, useExisting: Ka },
          { provide: F_, useExisting: Ps },
          { provide: Ps, useClass: Ps, deps: [Le] },
          { provide: Ga, useClass: Ga, deps: [Wa, Se] },
          { provide: class NN {}, useClass: cx, deps: [] },
          [],
        ];
      let K_ = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: Ts, useValue: n.appId },
                  { provide: P_, useExisting: Ts },
                  lx,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(W_, 12));
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ providers: [...q_, ...G_], imports: [Kn, iR] })),
            e
          );
        })(),
        Q_ = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(Le));
            }),
            (e.ɵprov = V({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function Ix() {
                        return new Q_(I(Le));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      typeof window < "u" && window;
      let X_ = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = V({
              token: e,
              factory: function (n) {
                let r = null;
                return (r = n ? new (n || e)() : I(J_)), r;
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        J_ = (() => {
          class e extends X_ {
            constructor(n) {
              super(), (this._doc = n);
            }
            sanitize(n, r) {
              if (null == r) return null;
              switch (n) {
                case ce.NONE:
                  return r;
                case ce.HTML:
                  return an(r, "HTML")
                    ? vt(r)
                    : Yp(this._doc, String(r)).toString();
                case ce.STYLE:
                  return an(r, "Style") ? vt(r) : r;
                case ce.SCRIPT:
                  if (an(r, "Script")) return vt(r);
                  throw new Error("unsafe value used in a script context");
                case ce.URL:
                  return an(r, "URL") ? vt(r) : Ho(String(r));
                case ce.RESOURCE_URL:
                  if (an(r, "ResourceURL")) return vt(r);
                  throw new Error(
                    "unsafe value used in a resource URL context (see https://g.co/ng/security#xss)"
                  );
                default:
                  throw new Error(
                    `Unexpected SecurityContext ${n} (see https://g.co/ng/security#xss)`
                  );
              }
            }
            bypassSecurityTrustHtml(n) {
              return (function cS(e) {
                return new iS(e);
              })(n);
            }
            bypassSecurityTrustStyle(n) {
              return (function dS(e) {
                return new sS(e);
              })(n);
            }
            bypassSecurityTrustScript(n) {
              return (function fS(e) {
                return new oS(e);
              })(n);
            }
            bypassSecurityTrustUrl(n) {
              return (function hS(e) {
                return new aS(e);
              })(n);
            }
            bypassSecurityTrustResourceUrl(n) {
              return (function pS(e) {
                return new lS(e);
              })(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(Le));
            }),
            (e.ɵprov = V({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function Ox(e) {
                        return new J_(e.get(Le));
                      })(I(Nt))),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class eD {}
      const An = "*";
      function Lx(e, t) {
        return { type: 7, name: e, definitions: t, options: {} };
      }
      function tD(e, t = null) {
        return { type: 4, styles: t, timings: e };
      }
      function nD(e, t = null) {
        return { type: 2, steps: e, options: t };
      }
      function Os(e) {
        return { type: 6, styles: e, offset: null };
      }
      function kx(e, t, n) {
        return { type: 0, name: e, styles: t, options: n };
      }
      function rD(e, t, n = null) {
        return { type: 1, expr: e, animation: t, options: n };
      }
      function iD(e) {
        Promise.resolve().then(e);
      }
      class Fs {
        constructor(t = 0, n = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = t + n);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        onStart(t) {
          this._originalOnStartFns.push(t), this._onStartFns.push(t);
        }
        onDone(t) {
          this._originalOnDoneFns.push(t), this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          iD(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          (this._started = !1),
            (this._finished = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        setPosition(t) {
          this._position = this.totalTime ? t * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(t) {
          const n = "start" == t ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      class sD {
        constructor(t) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = t);
          let n = 0,
            r = 0,
            i = 0;
          const s = this.players.length;
          0 == s
            ? iD(() => this._onFinish())
            : this.players.forEach((o) => {
                o.onDone(() => {
                  ++n == s && this._onFinish();
                }),
                  o.onDestroy(() => {
                    ++r == s && this._onDestroy();
                  }),
                  o.onStart(() => {
                    ++i == s && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (o, a) => Math.max(o, a.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((t) => t.init());
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((t) => t()),
            (this._onStartFns = []));
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((t) => t.play());
        }
        pause() {
          this.players.forEach((t) => t.pause());
        }
        restart() {
          this.players.forEach((t) => t.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((t) => t.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((t) => t.destroy()),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((t) => t.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(t) {
          const n = t * this.totalTime;
          this.players.forEach((r) => {
            const i = r.totalTime ? Math.min(1, n / r.totalTime) : 1;
            r.setPosition(i);
          });
        }
        getPosition() {
          const t = this.players.reduce(
            (n, r) => (null === n || r.totalTime > n.totalTime ? r : n),
            null
          );
          return null != t ? t.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((t) => {
            t.beforeDestroy && t.beforeDestroy();
          });
        }
        triggerCallback(t) {
          const n = "start" == t ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      function oD(e) {
        return new D(3e3, !1);
      }
      function vP() {
        return typeof window < "u" && typeof window.document < "u";
      }
      function Gd() {
        return (
          typeof process < "u" &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function Yn(e) {
        switch (e.length) {
          case 0:
            return new Fs();
          case 1:
            return e[0];
          default:
            return new sD(e);
        }
      }
      function aD(e, t, n, r, i = new Map(), s = new Map()) {
        const o = [],
          a = [];
        let l = -1,
          u = null;
        if (
          (r.forEach((c) => {
            const d = c.get("offset"),
              f = d == l,
              h = (f && u) || new Map();
            c.forEach((p, g) => {
              let m = g,
                _ = p;
              if ("offset" !== g)
                switch (((m = t.normalizePropertyName(m, o)), _)) {
                  case "!":
                    _ = i.get(g);
                    break;
                  case An:
                    _ = s.get(g);
                    break;
                  default:
                    _ = t.normalizeStyleValue(g, m, _, o);
                }
              h.set(m, _);
            }),
              f || a.push(h),
              (u = h),
              (l = d);
          }),
          o.length)
        )
          throw (function oP(e) {
            return new D(3502, !1);
          })();
        return a;
      }
      function qd(e, t, n, r) {
        switch (t) {
          case "start":
            e.onStart(() => r(n && Kd(n, "start", e)));
            break;
          case "done":
            e.onDone(() => r(n && Kd(n, "done", e)));
            break;
          case "destroy":
            e.onDestroy(() => r(n && Kd(n, "destroy", e)));
        }
      }
      function Kd(e, t, n) {
        const s = Qd(
            e.element,
            e.triggerName,
            e.fromState,
            e.toState,
            t || e.phaseName,
            n.totalTime ?? e.totalTime,
            !!n.disabled
          ),
          o = e._data;
        return null != o && (s._data = o), s;
      }
      function Qd(e, t, n, r, i = "", s = 0, o) {
        return {
          element: e,
          triggerName: t,
          fromState: n,
          toState: r,
          phaseName: i,
          totalTime: s,
          disabled: !!o,
        };
      }
      function Et(e, t, n) {
        let r = e.get(t);
        return r || e.set(t, (r = n)), r;
      }
      function lD(e) {
        const t = e.indexOf(":");
        return [e.substring(1, t), e.slice(t + 1)];
      }
      let Yd = (e, t) => !1,
        uD = (e, t, n) => [],
        cD = null;
      function Zd(e) {
        const t = e.parentNode || e.host;
        return t === cD ? null : t;
      }
      (Gd() || typeof Element < "u") &&
        (vP()
          ? ((cD = (() => document.documentElement)()),
            (Yd = (e, t) => {
              for (; t; ) {
                if (t === e) return !0;
                t = Zd(t);
              }
              return !1;
            }))
          : (Yd = (e, t) => e.contains(t)),
        (uD = (e, t, n) => {
          if (n) return Array.from(e.querySelectorAll(t));
          const r = e.querySelector(t);
          return r ? [r] : [];
        }));
      let Dr = null,
        dD = !1;
      const fD = Yd,
        hD = uD;
      let pD = (() => {
          class e {
            validateStyleProperty(n) {
              return (function DP(e) {
                Dr ||
                  ((Dr =
                    (function EP() {
                      return typeof document < "u" ? document.body : null;
                    })() || {}),
                  (dD = !!Dr.style && "WebkitAppearance" in Dr.style));
                let t = !0;
                return (
                  Dr.style &&
                    !(function _P(e) {
                      return "ebkit" == e.substring(1, 6);
                    })(e) &&
                    ((t = e in Dr.style),
                    !t &&
                      dD &&
                      (t =
                        "Webkit" + e.charAt(0).toUpperCase() + e.slice(1) in
                        Dr.style)),
                  t
                );
              })(n);
            }
            matchesElement(n, r) {
              return !1;
            }
            containsElement(n, r) {
              return fD(n, r);
            }
            getParentElement(n) {
              return Zd(n);
            }
            query(n, r, i) {
              return hD(n, r, i);
            }
            computeStyle(n, r, i) {
              return i || "";
            }
            animate(n, r, i, s, o, a = [], l) {
              return new Fs(i, s);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = V({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Xd = (() => {
          class e {}
          return (e.NOOP = new pD()), e;
        })();
      const Jd = "ng-enter",
        Qa = "ng-leave",
        Ya = "ng-trigger",
        Za = ".ng-trigger",
        mD = "ng-animating",
        ef = ".ng-animating";
      function Rn(e) {
        if ("number" == typeof e) return e;
        const t = e.match(/^(-?[\.\d]+)(m?s)/);
        return !t || t.length < 2 ? 0 : tf(parseFloat(t[1]), t[2]);
      }
      function tf(e, t) {
        return "s" === t ? 1e3 * e : e;
      }
      function Xa(e, t, n) {
        return e.hasOwnProperty("duration")
          ? e
          : (function bP(e, t, n) {
              let i,
                s = 0,
                o = "";
              if ("string" == typeof e) {
                const a = e.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return t.push(oD()), { duration: 0, delay: 0, easing: "" };
                i = tf(parseFloat(a[1]), a[2]);
                const l = a[3];
                null != l && (s = tf(parseFloat(l), a[4]));
                const u = a[5];
                u && (o = u);
              } else i = e;
              if (!n) {
                let a = !1,
                  l = t.length;
                i < 0 &&
                  (t.push(
                    (function Vx() {
                      return new D(3100, !1);
                    })()
                  ),
                  (a = !0)),
                  s < 0 &&
                    (t.push(
                      (function Bx() {
                        return new D(3101, !1);
                      })()
                    ),
                    (a = !0)),
                  a && t.splice(l, 0, oD());
              }
              return { duration: i, delay: s, easing: o };
            })(e, t, n);
      }
      function Ls(e, t = {}) {
        return (
          Object.keys(e).forEach((n) => {
            t[n] = e[n];
          }),
          t
        );
      }
      function yD(e) {
        const t = new Map();
        return (
          Object.keys(e).forEach((n) => {
            t.set(n, e[n]);
          }),
          t
        );
      }
      function Zn(e, t = new Map(), n) {
        if (n) for (let [r, i] of n) t.set(r, i);
        for (let [r, i] of e) t.set(r, i);
        return t;
      }
      function _D(e, t, n) {
        return n ? t + ":" + n + ";" : "";
      }
      function DD(e) {
        let t = "";
        for (let n = 0; n < e.style.length; n++) {
          const r = e.style.item(n);
          t += _D(0, r, e.style.getPropertyValue(r));
        }
        for (const n in e.style)
          e.style.hasOwnProperty(n) &&
            !n.startsWith("_") &&
            (t += _D(0, MP(n), e.style[n]));
        e.setAttribute("style", t);
      }
      function hn(e, t, n) {
        e.style &&
          (t.forEach((r, i) => {
            const s = rf(i);
            n && !n.has(i) && n.set(i, e.style[s]), (e.style[s] = r);
          }),
          Gd() && DD(e));
      }
      function Er(e, t) {
        e.style &&
          (t.forEach((n, r) => {
            const i = rf(r);
            e.style[i] = "";
          }),
          Gd() && DD(e));
      }
      function ks(e) {
        return Array.isArray(e) ? (1 == e.length ? e[0] : nD(e)) : e;
      }
      const nf = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function ED(e) {
        let t = [];
        if ("string" == typeof e) {
          let n;
          for (; (n = nf.exec(e)); ) t.push(n[1]);
          nf.lastIndex = 0;
        }
        return t;
      }
      function Vs(e, t, n) {
        const r = e.toString(),
          i = r.replace(nf, (s, o) => {
            let a = t[o];
            return (
              null == a &&
                (n.push(
                  (function $x(e) {
                    return new D(3003, !1);
                  })()
                ),
                (a = "")),
              a.toString()
            );
          });
        return i == r ? e : i;
      }
      function Ja(e) {
        const t = [];
        let n = e.next();
        for (; !n.done; ) t.push(n.value), (n = e.next());
        return t;
      }
      const IP = /-+([a-z0-9])/g;
      function rf(e) {
        return e.replace(IP, (...t) => t[1].toUpperCase());
      }
      function MP(e) {
        return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function wt(e, t, n) {
        switch (t.type) {
          case 7:
            return e.visitTrigger(t, n);
          case 0:
            return e.visitState(t, n);
          case 1:
            return e.visitTransition(t, n);
          case 2:
            return e.visitSequence(t, n);
          case 3:
            return e.visitGroup(t, n);
          case 4:
            return e.visitAnimate(t, n);
          case 5:
            return e.visitKeyframes(t, n);
          case 6:
            return e.visitStyle(t, n);
          case 8:
            return e.visitReference(t, n);
          case 9:
            return e.visitAnimateChild(t, n);
          case 10:
            return e.visitAnimateRef(t, n);
          case 11:
            return e.visitQuery(t, n);
          case 12:
            return e.visitStagger(t, n);
          default:
            throw (function Ux(e) {
              return new D(3004, !1);
            })();
        }
      }
      function wD(e, t) {
        return window.getComputedStyle(e)[t];
      }
      function OP(e, t) {
        const n = [];
        return (
          "string" == typeof e
            ? e.split(/\s*,\s*/).forEach((r) =>
                (function FP(e, t, n) {
                  if (":" == e[0]) {
                    const l = (function LP(e, t) {
                      switch (e) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (n, r) => parseFloat(r) > parseFloat(n);
                        case ":decrement":
                          return (n, r) => parseFloat(r) < parseFloat(n);
                        default:
                          return (
                            t.push(
                              (function nP(e) {
                                return new D(3016, !1);
                              })()
                            ),
                            "* => *"
                          );
                      }
                    })(e, n);
                    if ("function" == typeof l) return void t.push(l);
                    e = l;
                  }
                  const r = e.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == r || r.length < 4)
                    return (
                      n.push(
                        (function tP(e) {
                          return new D(3015, !1);
                        })()
                      ),
                      t
                    );
                  const i = r[1],
                    s = r[2],
                    o = r[3];
                  t.push(CD(i, o));
                  "<" == s[0] && !("*" == i && "*" == o) && t.push(CD(o, i));
                })(r, n, t)
              )
            : n.push(e),
          n
        );
      }
      const rl = new Set(["true", "1"]),
        il = new Set(["false", "0"]);
      function CD(e, t) {
        const n = rl.has(e) || il.has(e),
          r = rl.has(t) || il.has(t);
        return (i, s) => {
          let o = "*" == e || e == i,
            a = "*" == t || t == s;
          return (
            !o && n && "boolean" == typeof i && (o = i ? rl.has(e) : il.has(e)),
            !a && r && "boolean" == typeof s && (a = s ? rl.has(t) : il.has(t)),
            o && a
          );
        };
      }
      const kP = new RegExp("s*:selfs*,?", "g");
      function sf(e, t, n, r) {
        return new VP(e).build(t, n, r);
      }
      class VP {
        constructor(t) {
          this._driver = t;
        }
        build(t, n, r) {
          const i = new $P(n);
          return this._resetContextStyleTimingState(i), wt(this, ks(t), i);
        }
        _resetContextStyleTimingState(t) {
          (t.currentQuerySelector = ""),
            (t.collectedStyles = new Map()),
            t.collectedStyles.set("", new Map()),
            (t.currentTime = 0);
        }
        visitTrigger(t, n) {
          let r = (n.queryCount = 0),
            i = (n.depCount = 0);
          const s = [],
            o = [];
          return (
            "@" == t.name.charAt(0) &&
              n.errors.push(
                (function zx() {
                  return new D(3006, !1);
                })()
              ),
            t.definitions.forEach((a) => {
              if ((this._resetContextStyleTimingState(n), 0 == a.type)) {
                const l = a,
                  u = l.name;
                u
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((c) => {
                    (l.name = c), s.push(this.visitState(l, n));
                  }),
                  (l.name = u);
              } else if (1 == a.type) {
                const l = this.visitTransition(a, n);
                (r += l.queryCount), (i += l.depCount), o.push(l);
              } else
                n.errors.push(
                  (function Wx() {
                    return new D(3007, !1);
                  })()
                );
            }),
            {
              type: 7,
              name: t.name,
              states: s,
              transitions: o,
              queryCount: r,
              depCount: i,
              options: null,
            }
          );
        }
        visitState(t, n) {
          const r = this.visitStyle(t.styles, n),
            i = (t.options && t.options.params) || null;
          if (r.containsDynamicStyles) {
            const s = new Set(),
              o = i || {};
            r.styles.forEach((a) => {
              a instanceof Map &&
                a.forEach((l) => {
                  ED(l).forEach((u) => {
                    o.hasOwnProperty(u) || s.add(u);
                  });
                });
            }),
              s.size &&
                (Ja(s.values()),
                n.errors.push(
                  (function Gx(e, t) {
                    return new D(3008, !1);
                  })()
                ));
          }
          return {
            type: 0,
            name: t.name,
            style: r,
            options: i ? { params: i } : null,
          };
        }
        visitTransition(t, n) {
          (n.queryCount = 0), (n.depCount = 0);
          const r = wt(this, ks(t.animation), n);
          return {
            type: 1,
            matchers: OP(t.expr, n.errors),
            animation: r,
            queryCount: n.queryCount,
            depCount: n.depCount,
            options: wr(t.options),
          };
        }
        visitSequence(t, n) {
          return {
            type: 2,
            steps: t.steps.map((r) => wt(this, r, n)),
            options: wr(t.options),
          };
        }
        visitGroup(t, n) {
          const r = n.currentTime;
          let i = 0;
          const s = t.steps.map((o) => {
            n.currentTime = r;
            const a = wt(this, o, n);
            return (i = Math.max(i, n.currentTime)), a;
          });
          return (
            (n.currentTime = i), { type: 3, steps: s, options: wr(t.options) }
          );
        }
        visitAnimate(t, n) {
          const r = (function HP(e, t) {
            if (e.hasOwnProperty("duration")) return e;
            if ("number" == typeof e) return af(Xa(e, t).duration, 0, "");
            const n = e;
            if (
              n
                .split(/\s+/)
                .some((s) => "{" == s.charAt(0) && "{" == s.charAt(1))
            ) {
              const s = af(0, 0, "");
              return (s.dynamic = !0), (s.strValue = n), s;
            }
            const i = Xa(n, t);
            return af(i.duration, i.delay, i.easing);
          })(t.timings, n.errors);
          n.currentAnimateTimings = r;
          let i,
            s = t.styles ? t.styles : Os({});
          if (5 == s.type) i = this.visitKeyframes(s, n);
          else {
            let o = t.styles,
              a = !1;
            if (!o) {
              a = !0;
              const u = {};
              r.easing && (u.easing = r.easing), (o = Os(u));
            }
            n.currentTime += r.duration + r.delay;
            const l = this.visitStyle(o, n);
            (l.isEmptyStep = a), (i = l);
          }
          return (
            (n.currentAnimateTimings = null),
            { type: 4, timings: r, style: i, options: null }
          );
        }
        visitStyle(t, n) {
          const r = this._makeStyleAst(t, n);
          return this._validateStyleAst(r, n), r;
        }
        _makeStyleAst(t, n) {
          const r = [],
            i = Array.isArray(t.styles) ? t.styles : [t.styles];
          for (let a of i)
            "string" == typeof a
              ? a === An
                ? r.push(a)
                : n.errors.push(new D(3002, !1))
              : r.push(yD(a));
          let s = !1,
            o = null;
          return (
            r.forEach((a) => {
              if (
                a instanceof Map &&
                (a.has("easing") && ((o = a.get("easing")), a.delete("easing")),
                !s)
              )
                for (let l of a.values())
                  if (l.toString().indexOf("{{") >= 0) {
                    s = !0;
                    break;
                  }
            }),
            {
              type: 6,
              styles: r,
              easing: o,
              offset: t.offset,
              containsDynamicStyles: s,
              options: null,
            }
          );
        }
        _validateStyleAst(t, n) {
          const r = n.currentAnimateTimings;
          let i = n.currentTime,
            s = n.currentTime;
          r && s > 0 && (s -= r.duration + r.delay),
            t.styles.forEach((o) => {
              "string" != typeof o &&
                o.forEach((a, l) => {
                  const u = n.collectedStyles.get(n.currentQuerySelector),
                    c = u.get(l);
                  let d = !0;
                  c &&
                    (s != i &&
                      s >= c.startTime &&
                      i <= c.endTime &&
                      (n.errors.push(
                        (function Kx(e, t, n, r, i) {
                          return new D(3010, !1);
                        })()
                      ),
                      (d = !1)),
                    (s = c.startTime)),
                    d && u.set(l, { startTime: s, endTime: i }),
                    n.options &&
                      (function TP(e, t, n) {
                        const r = t.params || {},
                          i = ED(e);
                        i.length &&
                          i.forEach((s) => {
                            r.hasOwnProperty(s) ||
                              n.push(
                                (function jx(e) {
                                  return new D(3001, !1);
                                })()
                              );
                          });
                      })(a, n.options, n.errors);
                });
            });
        }
        visitKeyframes(t, n) {
          const r = { type: 5, styles: [], options: null };
          if (!n.currentAnimateTimings)
            return (
              n.errors.push(
                (function Qx() {
                  return new D(3011, !1);
                })()
              ),
              r
            );
          let s = 0;
          const o = [];
          let a = !1,
            l = !1,
            u = 0;
          const c = t.steps.map((_) => {
            const E = this._makeStyleAst(_, n);
            let y =
                null != E.offset
                  ? E.offset
                  : (function UP(e) {
                      if ("string" == typeof e) return null;
                      let t = null;
                      if (Array.isArray(e))
                        e.forEach((n) => {
                          if (n instanceof Map && n.has("offset")) {
                            const r = n;
                            (t = parseFloat(r.get("offset"))),
                              r.delete("offset");
                          }
                        });
                      else if (e instanceof Map && e.has("offset")) {
                        const n = e;
                        (t = parseFloat(n.get("offset"))), n.delete("offset");
                      }
                      return t;
                    })(E.styles),
              b = 0;
            return (
              null != y && (s++, (b = E.offset = y)),
              (l = l || b < 0 || b > 1),
              (a = a || b < u),
              (u = b),
              o.push(b),
              E
            );
          });
          l &&
            n.errors.push(
              (function Yx() {
                return new D(3012, !1);
              })()
            ),
            a &&
              n.errors.push(
                (function Zx() {
                  return new D(3200, !1);
                })()
              );
          const d = t.steps.length;
          let f = 0;
          s > 0 && s < d
            ? n.errors.push(
                (function Xx() {
                  return new D(3202, !1);
                })()
              )
            : 0 == s && (f = 1 / (d - 1));
          const h = d - 1,
            p = n.currentTime,
            g = n.currentAnimateTimings,
            m = g.duration;
          return (
            c.forEach((_, E) => {
              const y = f > 0 ? (E == h ? 1 : f * E) : o[E],
                b = y * m;
              (n.currentTime = p + g.delay + b),
                (g.duration = b),
                this._validateStyleAst(_, n),
                (_.offset = y),
                r.styles.push(_);
            }),
            r
          );
        }
        visitReference(t, n) {
          return {
            type: 8,
            animation: wt(this, ks(t.animation), n),
            options: wr(t.options),
          };
        }
        visitAnimateChild(t, n) {
          return n.depCount++, { type: 9, options: wr(t.options) };
        }
        visitAnimateRef(t, n) {
          return {
            type: 10,
            animation: this.visitReference(t.animation, n),
            options: wr(t.options),
          };
        }
        visitQuery(t, n) {
          const r = n.currentQuerySelector,
            i = t.options || {};
          n.queryCount++, (n.currentQuery = t);
          const [s, o] = (function BP(e) {
            const t = !!e.split(/\s*,\s*/).find((n) => ":self" == n);
            return (
              t && (e = e.replace(kP, "")),
              (e = e
                .replace(/@\*/g, Za)
                .replace(/@\w+/g, (n) => Za + "-" + n.slice(1))
                .replace(/:animating/g, ef)),
              [e, t]
            );
          })(t.selector);
          (n.currentQuerySelector = r.length ? r + " " + s : s),
            Et(n.collectedStyles, n.currentQuerySelector, new Map());
          const a = wt(this, ks(t.animation), n);
          return (
            (n.currentQuery = null),
            (n.currentQuerySelector = r),
            {
              type: 11,
              selector: s,
              limit: i.limit || 0,
              optional: !!i.optional,
              includeSelf: o,
              animation: a,
              originalSelector: t.selector,
              options: wr(t.options),
            }
          );
        }
        visitStagger(t, n) {
          n.currentQuery ||
            n.errors.push(
              (function Jx() {
                return new D(3013, !1);
              })()
            );
          const r =
            "full" === t.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : Xa(t.timings, n.errors, !0);
          return {
            type: 12,
            animation: wt(this, ks(t.animation), n),
            timings: r,
            options: null,
          };
        }
      }
      class $P {
        constructor(t) {
          (this.errors = t),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = new Map()),
            (this.options = null),
            (this.unsupportedCSSPropertiesFound = new Set());
        }
      }
      function wr(e) {
        return (
          e
            ? (e = Ls(e)).params &&
              (e.params = (function jP(e) {
                return e ? Ls(e) : null;
              })(e.params))
            : (e = {}),
          e
        );
      }
      function af(e, t, n) {
        return { duration: e, delay: t, easing: n };
      }
      function lf(e, t, n, r, i, s, o = null, a = !1) {
        return {
          type: 1,
          element: e,
          keyframes: t,
          preStyleProps: n,
          postStyleProps: r,
          duration: i,
          delay: s,
          totalTime: i + s,
          easing: o,
          subTimeline: a,
        };
      }
      class sl {
        constructor() {
          this._map = new Map();
        }
        get(t) {
          return this._map.get(t) || [];
        }
        append(t, n) {
          let r = this._map.get(t);
          r || this._map.set(t, (r = [])), r.push(...n);
        }
        has(t) {
          return this._map.has(t);
        }
        clear() {
          this._map.clear();
        }
      }
      const GP = new RegExp(":enter", "g"),
        KP = new RegExp(":leave", "g");
      function uf(e, t, n, r, i, s = new Map(), o = new Map(), a, l, u = []) {
        return new QP().buildKeyframes(e, t, n, r, i, s, o, a, l, u);
      }
      class QP {
        buildKeyframes(t, n, r, i, s, o, a, l, u, c = []) {
          u = u || new sl();
          const d = new cf(t, n, u, i, s, c, []);
          d.options = l;
          const f = l.delay ? Rn(l.delay) : 0;
          d.currentTimeline.delayNextStep(f),
            d.currentTimeline.setStyles([o], null, d.errors, l),
            wt(this, r, d);
          const h = d.timelines.filter((p) => p.containsAnimation());
          if (h.length && a.size) {
            let p;
            for (let g = h.length - 1; g >= 0; g--) {
              const m = h[g];
              if (m.element === n) {
                p = m;
                break;
              }
            }
            p &&
              !p.allowOnlyTimelineStyles() &&
              p.setStyles([a], null, d.errors, l);
          }
          return h.length
            ? h.map((p) => p.buildKeyframes())
            : [lf(n, [], [], [], 0, f, "", !1)];
        }
        visitTrigger(t, n) {}
        visitState(t, n) {}
        visitTransition(t, n) {}
        visitAnimateChild(t, n) {
          const r = n.subInstructions.get(n.element);
          if (r) {
            const i = n.createSubContext(t.options),
              s = n.currentTimeline.currentTime,
              o = this._visitSubInstructions(r, i, i.options);
            s != o && n.transformIntoNewTimeline(o);
          }
          n.previousNode = t;
        }
        visitAnimateRef(t, n) {
          const r = n.createSubContext(t.options);
          r.transformIntoNewTimeline(),
            this._applyAnimationRefDelays(
              [t.options, t.animation.options],
              n,
              r
            ),
            this.visitReference(t.animation, r),
            n.transformIntoNewTimeline(r.currentTimeline.currentTime),
            (n.previousNode = t);
        }
        _applyAnimationRefDelays(t, n, r) {
          for (const i of t) {
            const s = i?.delay;
            if (s) {
              const o =
                "number" == typeof s ? s : Rn(Vs(s, i?.params ?? {}, n.errors));
              r.delayNextStep(o);
            }
          }
        }
        _visitSubInstructions(t, n, r) {
          let s = n.currentTimeline.currentTime;
          const o = null != r.duration ? Rn(r.duration) : null,
            a = null != r.delay ? Rn(r.delay) : null;
          return (
            0 !== o &&
              t.forEach((l) => {
                const u = n.appendInstructionToTimeline(l, o, a);
                s = Math.max(s, u.duration + u.delay);
              }),
            s
          );
        }
        visitReference(t, n) {
          n.updateOptions(t.options, !0),
            wt(this, t.animation, n),
            (n.previousNode = t);
        }
        visitSequence(t, n) {
          const r = n.subContextCount;
          let i = n;
          const s = t.options;
          if (
            s &&
            (s.params || s.delay) &&
            ((i = n.createSubContext(s)),
            i.transformIntoNewTimeline(),
            null != s.delay)
          ) {
            6 == i.previousNode.type &&
              (i.currentTimeline.snapshotCurrentStyles(),
              (i.previousNode = ol));
            const o = Rn(s.delay);
            i.delayNextStep(o);
          }
          t.steps.length &&
            (t.steps.forEach((o) => wt(this, o, i)),
            i.currentTimeline.applyStylesToKeyframe(),
            i.subContextCount > r && i.transformIntoNewTimeline()),
            (n.previousNode = t);
        }
        visitGroup(t, n) {
          const r = [];
          let i = n.currentTimeline.currentTime;
          const s = t.options && t.options.delay ? Rn(t.options.delay) : 0;
          t.steps.forEach((o) => {
            const a = n.createSubContext(t.options);
            s && a.delayNextStep(s),
              wt(this, o, a),
              (i = Math.max(i, a.currentTimeline.currentTime)),
              r.push(a.currentTimeline);
          }),
            r.forEach((o) => n.currentTimeline.mergeTimelineCollectedStyles(o)),
            n.transformIntoNewTimeline(i),
            (n.previousNode = t);
        }
        _visitTiming(t, n) {
          if (t.dynamic) {
            const r = t.strValue;
            return Xa(n.params ? Vs(r, n.params, n.errors) : r, n.errors);
          }
          return { duration: t.duration, delay: t.delay, easing: t.easing };
        }
        visitAnimate(t, n) {
          const r = (n.currentAnimateTimings = this._visitTiming(t.timings, n)),
            i = n.currentTimeline;
          r.delay && (n.incrementTime(r.delay), i.snapshotCurrentStyles());
          const s = t.style;
          5 == s.type
            ? this.visitKeyframes(s, n)
            : (n.incrementTime(r.duration),
              this.visitStyle(s, n),
              i.applyStylesToKeyframe()),
            (n.currentAnimateTimings = null),
            (n.previousNode = t);
        }
        visitStyle(t, n) {
          const r = n.currentTimeline,
            i = n.currentAnimateTimings;
          !i && r.hasCurrentStyleProperties() && r.forwardFrame();
          const s = (i && i.easing) || t.easing;
          t.isEmptyStep
            ? r.applyEmptyStep(s)
            : r.setStyles(t.styles, s, n.errors, n.options),
            (n.previousNode = t);
        }
        visitKeyframes(t, n) {
          const r = n.currentAnimateTimings,
            i = n.currentTimeline.duration,
            s = r.duration,
            a = n.createSubContext().currentTimeline;
          (a.easing = r.easing),
            t.styles.forEach((l) => {
              a.forwardTime((l.offset || 0) * s),
                a.setStyles(l.styles, l.easing, n.errors, n.options),
                a.applyStylesToKeyframe();
            }),
            n.currentTimeline.mergeTimelineCollectedStyles(a),
            n.transformIntoNewTimeline(i + s),
            (n.previousNode = t);
        }
        visitQuery(t, n) {
          const r = n.currentTimeline.currentTime,
            i = t.options || {},
            s = i.delay ? Rn(i.delay) : 0;
          s &&
            (6 === n.previousNode.type ||
              (0 == r && n.currentTimeline.hasCurrentStyleProperties())) &&
            (n.currentTimeline.snapshotCurrentStyles(), (n.previousNode = ol));
          let o = r;
          const a = n.invokeQuery(
            t.selector,
            t.originalSelector,
            t.limit,
            t.includeSelf,
            !!i.optional,
            n.errors
          );
          n.currentQueryTotal = a.length;
          let l = null;
          a.forEach((u, c) => {
            n.currentQueryIndex = c;
            const d = n.createSubContext(t.options, u);
            s && d.delayNextStep(s),
              u === n.element && (l = d.currentTimeline),
              wt(this, t.animation, d),
              d.currentTimeline.applyStylesToKeyframe(),
              (o = Math.max(o, d.currentTimeline.currentTime));
          }),
            (n.currentQueryIndex = 0),
            (n.currentQueryTotal = 0),
            n.transformIntoNewTimeline(o),
            l &&
              (n.currentTimeline.mergeTimelineCollectedStyles(l),
              n.currentTimeline.snapshotCurrentStyles()),
            (n.previousNode = t);
        }
        visitStagger(t, n) {
          const r = n.parentContext,
            i = n.currentTimeline,
            s = t.timings,
            o = Math.abs(s.duration),
            a = o * (n.currentQueryTotal - 1);
          let l = o * n.currentQueryIndex;
          switch (s.duration < 0 ? "reverse" : s.easing) {
            case "reverse":
              l = a - l;
              break;
            case "full":
              l = r.currentStaggerTime;
          }
          const c = n.currentTimeline;
          l && c.delayNextStep(l);
          const d = c.currentTime;
          wt(this, t.animation, n),
            (n.previousNode = t),
            (r.currentStaggerTime =
              i.currentTime - d + (i.startTime - r.currentTimeline.startTime));
        }
      }
      const ol = {};
      class cf {
        constructor(t, n, r, i, s, o, a, l) {
          (this._driver = t),
            (this.element = n),
            (this.subInstructions = r),
            (this._enterClassName = i),
            (this._leaveClassName = s),
            (this.errors = o),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = ol),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new al(this._driver, n, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(t, n) {
          if (!t) return;
          const r = t;
          let i = this.options;
          null != r.duration && (i.duration = Rn(r.duration)),
            null != r.delay && (i.delay = Rn(r.delay));
          const s = r.params;
          if (s) {
            let o = i.params;
            o || (o = this.options.params = {}),
              Object.keys(s).forEach((a) => {
                (!n || !o.hasOwnProperty(a)) &&
                  (o[a] = Vs(s[a], o, this.errors));
              });
          }
        }
        _copyOptions() {
          const t = {};
          if (this.options) {
            const n = this.options.params;
            if (n) {
              const r = (t.params = {});
              Object.keys(n).forEach((i) => {
                r[i] = n[i];
              });
            }
          }
          return t;
        }
        createSubContext(t = null, n, r) {
          const i = n || this.element,
            s = new cf(
              this._driver,
              i,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(i, r || 0)
            );
          return (
            (s.previousNode = this.previousNode),
            (s.currentAnimateTimings = this.currentAnimateTimings),
            (s.options = this._copyOptions()),
            s.updateOptions(t),
            (s.currentQueryIndex = this.currentQueryIndex),
            (s.currentQueryTotal = this.currentQueryTotal),
            (s.parentContext = this),
            this.subContextCount++,
            s
          );
        }
        transformIntoNewTimeline(t) {
          return (
            (this.previousNode = ol),
            (this.currentTimeline = this.currentTimeline.fork(this.element, t)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(t, n, r) {
          const i = {
              duration: n ?? t.duration,
              delay: this.currentTimeline.currentTime + (r ?? 0) + t.delay,
              easing: "",
            },
            s = new YP(
              this._driver,
              t.element,
              t.keyframes,
              t.preStyleProps,
              t.postStyleProps,
              i,
              t.stretchStartingKeyframe
            );
          return this.timelines.push(s), i;
        }
        incrementTime(t) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + t);
        }
        delayNextStep(t) {
          t > 0 && this.currentTimeline.delayNextStep(t);
        }
        invokeQuery(t, n, r, i, s, o) {
          let a = [];
          if ((i && a.push(this.element), t.length > 0)) {
            t = (t = t.replace(GP, "." + this._enterClassName)).replace(
              KP,
              "." + this._leaveClassName
            );
            let u = this._driver.query(this.element, t, 1 != r);
            0 !== r &&
              (u = r < 0 ? u.slice(u.length + r, u.length) : u.slice(0, r)),
              a.push(...u);
          }
          return (
            !s &&
              0 == a.length &&
              o.push(
                (function eP(e) {
                  return new D(3014, !1);
                })()
              ),
            a
          );
        }
      }
      class al {
        constructor(t, n, r, i) {
          (this._driver = t),
            (this.element = n),
            (this.startTime = r),
            (this._elementTimelineStylesLookup = i),
            (this.duration = 0),
            (this._previousKeyframe = new Map()),
            (this._currentKeyframe = new Map()),
            (this._keyframes = new Map()),
            (this._styleSummary = new Map()),
            (this._localTimelineStyles = new Map()),
            (this._pendingStyles = new Map()),
            (this._backFill = new Map()),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(n)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                n,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.hasCurrentStyleProperties();
            default:
              return !0;
          }
        }
        hasCurrentStyleProperties() {
          return this._currentKeyframe.size > 0;
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(t) {
          const n = 1 === this._keyframes.size && this._pendingStyles.size;
          this.duration || n
            ? (this.forwardTime(this.currentTime + t),
              n && this.snapshotCurrentStyles())
            : (this.startTime += t);
        }
        fork(t, n) {
          return (
            this.applyStylesToKeyframe(),
            new al(
              this._driver,
              t,
              n || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = new Map()),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(t) {
          this.applyStylesToKeyframe(),
            (this.duration = t),
            this._loadKeyframe();
        }
        _updateStyle(t, n) {
          this._localTimelineStyles.set(t, n),
            this._globalTimelineStyles.set(t, n),
            this._styleSummary.set(t, { time: this.currentTime, value: n });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(t) {
          t && this._previousKeyframe.set("easing", t);
          for (let [n, r] of this._globalTimelineStyles)
            this._backFill.set(n, r || An), this._currentKeyframe.set(n, An);
          this._currentEmptyStepKeyframe = this._currentKeyframe;
        }
        setStyles(t, n, r, i) {
          n && this._previousKeyframe.set("easing", n);
          const s = (i && i.params) || {},
            o = (function ZP(e, t) {
              const n = new Map();
              let r;
              return (
                e.forEach((i) => {
                  if ("*" === i) {
                    r = r || t.keys();
                    for (let s of r) n.set(s, An);
                  } else Zn(i, n);
                }),
                n
              );
            })(t, this._globalTimelineStyles);
          for (let [a, l] of o) {
            const u = Vs(l, s, r);
            this._pendingStyles.set(a, u),
              this._localTimelineStyles.has(a) ||
                this._backFill.set(a, this._globalTimelineStyles.get(a) ?? An),
              this._updateStyle(a, u);
          }
        }
        applyStylesToKeyframe() {
          0 != this._pendingStyles.size &&
            (this._pendingStyles.forEach((t, n) => {
              this._currentKeyframe.set(n, t);
            }),
            this._pendingStyles.clear(),
            this._localTimelineStyles.forEach((t, n) => {
              this._currentKeyframe.has(n) || this._currentKeyframe.set(n, t);
            }));
        }
        snapshotCurrentStyles() {
          for (let [t, n] of this._localTimelineStyles)
            this._pendingStyles.set(t, n), this._updateStyle(t, n);
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const t = [];
          for (let n in this._currentKeyframe) t.push(n);
          return t;
        }
        mergeTimelineCollectedStyles(t) {
          t._styleSummary.forEach((n, r) => {
            const i = this._styleSummary.get(r);
            (!i || n.time > i.time) && this._updateStyle(r, n.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const t = new Set(),
            n = new Set(),
            r = 1 === this._keyframes.size && 0 === this.duration;
          let i = [];
          this._keyframes.forEach((a, l) => {
            const u = Zn(a, new Map(), this._backFill);
            u.forEach((c, d) => {
              "!" === c ? t.add(d) : c === An && n.add(d);
            }),
              r || u.set("offset", l / this.duration),
              i.push(u);
          });
          const s = t.size ? Ja(t.values()) : [],
            o = n.size ? Ja(n.values()) : [];
          if (r) {
            const a = i[0],
              l = new Map(a);
            a.set("offset", 0), l.set("offset", 1), (i = [a, l]);
          }
          return lf(
            this.element,
            i,
            s,
            o,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class YP extends al {
        constructor(t, n, r, i, s, o, a = !1) {
          super(t, n, o.delay),
            (this.keyframes = r),
            (this.preStyleProps = i),
            (this.postStyleProps = s),
            (this._stretchStartingKeyframe = a),
            (this.timings = {
              duration: o.duration,
              delay: o.delay,
              easing: o.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let t = this.keyframes,
            { delay: n, duration: r, easing: i } = this.timings;
          if (this._stretchStartingKeyframe && n) {
            const s = [],
              o = r + n,
              a = n / o,
              l = Zn(t[0]);
            l.set("offset", 0), s.push(l);
            const u = Zn(t[0]);
            u.set("offset", TD(a)), s.push(u);
            const c = t.length - 1;
            for (let d = 1; d <= c; d++) {
              let f = Zn(t[d]);
              const h = f.get("offset");
              f.set("offset", TD((n + h * r) / o)), s.push(f);
            }
            (r = o), (n = 0), (i = ""), (t = s);
          }
          return lf(
            this.element,
            t,
            this.preStyleProps,
            this.postStyleProps,
            r,
            n,
            i,
            !0
          );
        }
      }
      function TD(e, t = 3) {
        const n = Math.pow(10, t - 1);
        return Math.round(e * n) / n;
      }
      class df {}
      const XP = new Set([
        "width",
        "height",
        "minWidth",
        "minHeight",
        "maxWidth",
        "maxHeight",
        "left",
        "top",
        "bottom",
        "right",
        "fontSize",
        "outlineWidth",
        "outlineOffset",
        "paddingTop",
        "paddingLeft",
        "paddingBottom",
        "paddingRight",
        "marginTop",
        "marginLeft",
        "marginBottom",
        "marginRight",
        "borderRadius",
        "borderWidth",
        "borderTopWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderBottomWidth",
        "textIndent",
        "perspective",
      ]);
      class JP extends df {
        normalizePropertyName(t, n) {
          return rf(t);
        }
        normalizeStyleValue(t, n, r, i) {
          let s = "";
          const o = r.toString().trim();
          if (XP.has(n) && 0 !== r && "0" !== r)
            if ("number" == typeof r) s = "px";
            else {
              const a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                i.push(
                  (function Hx(e, t) {
                    return new D(3005, !1);
                  })()
                );
            }
          return o + s;
        }
      }
      function ID(e, t, n, r, i, s, o, a, l, u, c, d, f) {
        return {
          type: 0,
          element: e,
          triggerName: t,
          isRemovalTransition: i,
          fromState: n,
          fromStyles: s,
          toState: r,
          toStyles: o,
          timelines: a,
          queriedElements: l,
          preStyleProps: u,
          postStyleProps: c,
          totalTime: d,
          errors: f,
        };
      }
      const ff = {};
      class MD {
        constructor(t, n, r) {
          (this._triggerName = t), (this.ast = n), (this._stateStyles = r);
        }
        match(t, n, r, i) {
          return (function eO(e, t, n, r, i) {
            return e.some((s) => s(t, n, r, i));
          })(this.ast.matchers, t, n, r, i);
        }
        buildStyles(t, n, r) {
          let i = this._stateStyles.get("*");
          return (
            void 0 !== t && (i = this._stateStyles.get(t?.toString()) || i),
            i ? i.buildStyles(n, r) : new Map()
          );
        }
        build(t, n, r, i, s, o, a, l, u, c) {
          const d = [],
            f = (this.ast.options && this.ast.options.params) || ff,
            p = this.buildStyles(r, (a && a.params) || ff, d),
            g = (l && l.params) || ff,
            m = this.buildStyles(i, g, d),
            _ = new Set(),
            E = new Map(),
            y = new Map(),
            b = "void" === i,
            W = { params: tO(g, f), delay: this.ast.options?.delay },
            Q = c ? [] : uf(t, n, this.ast.animation, s, o, p, m, W, u, d);
          let ve = 0;
          if (
            (Q.forEach((bt) => {
              ve = Math.max(bt.duration + bt.delay, ve);
            }),
            d.length)
          )
            return ID(n, this._triggerName, r, i, b, p, m, [], [], E, y, ve, d);
          Q.forEach((bt) => {
            const St = bt.element,
              Ni = Et(E, St, new Set());
            bt.preStyleProps.forEach((rn) => Ni.add(rn));
            const On = Et(y, St, new Set());
            bt.postStyleProps.forEach((rn) => On.add(rn)),
              St !== n && _.add(St);
          });
          const Ct = Ja(_.values());
          return ID(n, this._triggerName, r, i, b, p, m, Q, Ct, E, y, ve);
        }
      }
      function tO(e, t) {
        const n = Ls(t);
        for (const r in e) e.hasOwnProperty(r) && null != e[r] && (n[r] = e[r]);
        return n;
      }
      class nO {
        constructor(t, n, r) {
          (this.styles = t), (this.defaultParams = n), (this.normalizer = r);
        }
        buildStyles(t, n) {
          const r = new Map(),
            i = Ls(this.defaultParams);
          return (
            Object.keys(t).forEach((s) => {
              const o = t[s];
              null !== o && (i[s] = o);
            }),
            this.styles.styles.forEach((s) => {
              "string" != typeof s &&
                s.forEach((o, a) => {
                  o && (o = Vs(o, i, n));
                  const l = this.normalizer.normalizePropertyName(a, n);
                  (o = this.normalizer.normalizeStyleValue(a, l, o, n)),
                    r.set(l, o);
                });
            }),
            r
          );
        }
      }
      class iO {
        constructor(t, n, r) {
          (this.name = t),
            (this.ast = n),
            (this._normalizer = r),
            (this.transitionFactories = []),
            (this.states = new Map()),
            n.states.forEach((i) => {
              this.states.set(
                i.name,
                new nO(i.style, (i.options && i.options.params) || {}, r)
              );
            }),
            AD(this.states, "true", "1"),
            AD(this.states, "false", "0"),
            n.transitions.forEach((i) => {
              this.transitionFactories.push(new MD(t, i, this.states));
            }),
            (this.fallbackTransition = (function sO(e, t, n) {
              return new MD(
                e,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(o, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                t
              );
            })(t, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(t, n, r, i) {
          return (
            this.transitionFactories.find((o) => o.match(t, n, r, i)) || null
          );
        }
        matchStyles(t, n, r) {
          return this.fallbackTransition.buildStyles(t, n, r);
        }
      }
      function AD(e, t, n) {
        e.has(t)
          ? e.has(n) || e.set(n, e.get(t))
          : e.has(n) && e.set(t, e.get(n));
      }
      const oO = new sl();
      class aO {
        constructor(t, n, r) {
          (this.bodyNode = t),
            (this._driver = n),
            (this._normalizer = r),
            (this._animations = new Map()),
            (this._playersById = new Map()),
            (this.players = []);
        }
        register(t, n) {
          const r = [],
            s = sf(this._driver, n, r, []);
          if (r.length)
            throw (function aP(e) {
              return new D(3503, !1);
            })();
          this._animations.set(t, s);
        }
        _buildPlayer(t, n, r) {
          const i = t.element,
            s = aD(0, this._normalizer, 0, t.keyframes, n, r);
          return this._driver.animate(
            i,
            s,
            t.duration,
            t.delay,
            t.easing,
            [],
            !0
          );
        }
        create(t, n, r = {}) {
          const i = [],
            s = this._animations.get(t);
          let o;
          const a = new Map();
          if (
            (s
              ? ((o = uf(
                  this._driver,
                  n,
                  s,
                  Jd,
                  Qa,
                  new Map(),
                  new Map(),
                  r,
                  oO,
                  i
                )),
                o.forEach((c) => {
                  const d = Et(a, c.element, new Map());
                  c.postStyleProps.forEach((f) => d.set(f, null));
                }))
              : (i.push(
                  (function lP() {
                    return new D(3300, !1);
                  })()
                ),
                (o = [])),
            i.length)
          )
            throw (function uP(e) {
              return new D(3504, !1);
            })();
          a.forEach((c, d) => {
            c.forEach((f, h) => {
              c.set(h, this._driver.computeStyle(d, h, An));
            });
          });
          const u = Yn(
            o.map((c) => {
              const d = a.get(c.element);
              return this._buildPlayer(c, new Map(), d);
            })
          );
          return (
            this._playersById.set(t, u),
            u.onDestroy(() => this.destroy(t)),
            this.players.push(u),
            u
          );
        }
        destroy(t) {
          const n = this._getPlayer(t);
          n.destroy(), this._playersById.delete(t);
          const r = this.players.indexOf(n);
          r >= 0 && this.players.splice(r, 1);
        }
        _getPlayer(t) {
          const n = this._playersById.get(t);
          if (!n)
            throw (function cP(e) {
              return new D(3301, !1);
            })();
          return n;
        }
        listen(t, n, r, i) {
          const s = Qd(n, "", "", "");
          return qd(this._getPlayer(t), r, s, i), () => {};
        }
        command(t, n, r, i) {
          if ("register" == r) return void this.register(t, i[0]);
          if ("create" == r) return void this.create(t, n, i[0] || {});
          const s = this._getPlayer(t);
          switch (r) {
            case "play":
              s.play();
              break;
            case "pause":
              s.pause();
              break;
            case "reset":
              s.reset();
              break;
            case "restart":
              s.restart();
              break;
            case "finish":
              s.finish();
              break;
            case "init":
              s.init();
              break;
            case "setPosition":
              s.setPosition(parseFloat(i[0]));
              break;
            case "destroy":
              this.destroy(t);
          }
        }
      }
      const RD = "ng-animate-queued",
        hf = "ng-animate-disabled",
        fO = [],
        ND = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        hO = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        Lt = "__ng_removed";
      class pf {
        constructor(t, n = "") {
          this.namespaceId = n;
          const r = t && t.hasOwnProperty("value");
          if (
            ((this.value = (function yO(e) {
              return e ?? null;
            })(r ? t.value : t)),
            r)
          ) {
            const s = Ls(t);
            delete s.value, (this.options = s);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(t) {
          const n = t.params;
          if (n) {
            const r = this.options.params;
            Object.keys(n).forEach((i) => {
              null == r[i] && (r[i] = n[i]);
            });
          }
        }
      }
      const Bs = "void",
        gf = new pf(Bs);
      class pO {
        constructor(t, n, r) {
          (this.id = t),
            (this.hostElement = n),
            (this._engine = r),
            (this.players = []),
            (this._triggers = new Map()),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + t),
            kt(n, this._hostClassName);
        }
        listen(t, n, r, i) {
          if (!this._triggers.has(n))
            throw (function dP(e, t) {
              return new D(3302, !1);
            })();
          if (null == r || 0 == r.length)
            throw (function fP(e) {
              return new D(3303, !1);
            })();
          if (
            !(function vO(e) {
              return "start" == e || "done" == e;
            })(r)
          )
            throw (function hP(e, t) {
              return new D(3400, !1);
            })();
          const s = Et(this._elementListeners, t, []),
            o = { name: n, phase: r, callback: i };
          s.push(o);
          const a = Et(this._engine.statesByElement, t, new Map());
          return (
            a.has(n) || (kt(t, Ya), kt(t, Ya + "-" + n), a.set(n, gf)),
            () => {
              this._engine.afterFlush(() => {
                const l = s.indexOf(o);
                l >= 0 && s.splice(l, 1), this._triggers.has(n) || a.delete(n);
              });
            }
          );
        }
        register(t, n) {
          return !this._triggers.has(t) && (this._triggers.set(t, n), !0);
        }
        _getTrigger(t) {
          const n = this._triggers.get(t);
          if (!n)
            throw (function pP(e) {
              return new D(3401, !1);
            })();
          return n;
        }
        trigger(t, n, r, i = !0) {
          const s = this._getTrigger(n),
            o = new mf(this.id, n, t);
          let a = this._engine.statesByElement.get(t);
          a ||
            (kt(t, Ya),
            kt(t, Ya + "-" + n),
            this._engine.statesByElement.set(t, (a = new Map())));
          let l = a.get(n);
          const u = new pf(r, this.id);
          if (
            (!(r && r.hasOwnProperty("value")) &&
              l &&
              u.absorbOptions(l.options),
            a.set(n, u),
            l || (l = gf),
            u.value !== Bs && l.value === u.value)
          ) {
            if (
              !(function EO(e, t) {
                const n = Object.keys(e),
                  r = Object.keys(t);
                if (n.length != r.length) return !1;
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (!t.hasOwnProperty(s) || e[s] !== t[s]) return !1;
                }
                return !0;
              })(l.params, u.params)
            ) {
              const g = [],
                m = s.matchStyles(l.value, l.params, g),
                _ = s.matchStyles(u.value, u.params, g);
              g.length
                ? this._engine.reportError(g)
                : this._engine.afterFlush(() => {
                    Er(t, m), hn(t, _);
                  });
            }
            return;
          }
          const f = Et(this._engine.playersByElement, t, []);
          f.forEach((g) => {
            g.namespaceId == this.id &&
              g.triggerName == n &&
              g.queued &&
              g.destroy();
          });
          let h = s.matchTransition(l.value, u.value, t, u.params),
            p = !1;
          if (!h) {
            if (!i) return;
            (h = s.fallbackTransition), (p = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: t,
              triggerName: n,
              transition: h,
              fromState: l,
              toState: u,
              player: o,
              isFallbackTransition: p,
            }),
            p ||
              (kt(t, RD),
              o.onStart(() => {
                wi(t, RD);
              })),
            o.onDone(() => {
              let g = this.players.indexOf(o);
              g >= 0 && this.players.splice(g, 1);
              const m = this._engine.playersByElement.get(t);
              if (m) {
                let _ = m.indexOf(o);
                _ >= 0 && m.splice(_, 1);
              }
            }),
            this.players.push(o),
            f.push(o),
            o
          );
        }
        deregister(t) {
          this._triggers.delete(t),
            this._engine.statesByElement.forEach((n) => n.delete(t)),
            this._elementListeners.forEach((n, r) => {
              this._elementListeners.set(
                r,
                n.filter((i) => i.name != t)
              );
            });
        }
        clearElementCache(t) {
          this._engine.statesByElement.delete(t),
            this._elementListeners.delete(t);
          const n = this._engine.playersByElement.get(t);
          n &&
            (n.forEach((r) => r.destroy()),
            this._engine.playersByElement.delete(t));
        }
        _signalRemovalForInnerTriggers(t, n) {
          const r = this._engine.driver.query(t, Za, !0);
          r.forEach((i) => {
            if (i[Lt]) return;
            const s = this._engine.fetchNamespacesByElement(i);
            s.size
              ? s.forEach((o) => o.triggerLeaveAnimation(i, n, !1, !0))
              : this.clearElementCache(i);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              r.forEach((i) => this.clearElementCache(i))
            );
        }
        triggerLeaveAnimation(t, n, r, i) {
          const s = this._engine.statesByElement.get(t),
            o = new Map();
          if (s) {
            const a = [];
            if (
              (s.forEach((l, u) => {
                if ((o.set(u, l.value), this._triggers.has(u))) {
                  const c = this.trigger(t, u, Bs, i);
                  c && a.push(c);
                }
              }),
              a.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, t, !0, n, o),
                r && Yn(a).onDone(() => this._engine.processLeaveNode(t)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(t) {
          const n = this._elementListeners.get(t),
            r = this._engine.statesByElement.get(t);
          if (n && r) {
            const i = new Set();
            n.forEach((s) => {
              const o = s.name;
              if (i.has(o)) return;
              i.add(o);
              const l = this._triggers.get(o).fallbackTransition,
                u = r.get(o) || gf,
                c = new pf(Bs),
                d = new mf(this.id, o, t);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: t,
                  triggerName: o,
                  transition: l,
                  fromState: u,
                  toState: c,
                  player: d,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(t, n) {
          const r = this._engine;
          if (
            (t.childElementCount && this._signalRemovalForInnerTriggers(t, n),
            this.triggerLeaveAnimation(t, n, !0))
          )
            return;
          let i = !1;
          if (r.totalAnimations) {
            const s = r.players.length ? r.playersByQueriedElement.get(t) : [];
            if (s && s.length) i = !0;
            else {
              let o = t;
              for (; (o = o.parentNode); )
                if (r.statesByElement.get(o)) {
                  i = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(t), i))
            r.markElementAsRemoved(this.id, t, !1, n);
          else {
            const s = t[Lt];
            (!s || s === ND) &&
              (r.afterFlush(() => this.clearElementCache(t)),
              r.destroyInnerAnimations(t),
              r._onRemovalComplete(t, n));
          }
        }
        insertNode(t, n) {
          kt(t, this._hostClassName);
        }
        drainQueuedTransitions(t) {
          const n = [];
          return (
            this._queue.forEach((r) => {
              const i = r.player;
              if (i.destroyed) return;
              const s = r.element,
                o = this._elementListeners.get(s);
              o &&
                o.forEach((a) => {
                  if (a.name == r.triggerName) {
                    const l = Qd(
                      s,
                      r.triggerName,
                      r.fromState.value,
                      r.toState.value
                    );
                    (l._data = t), qd(r.player, a.phase, l, a.callback);
                  }
                }),
                i.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      i.destroy();
                    })
                  : n.push(r);
            }),
            (this._queue = []),
            n.sort((r, i) => {
              const s = r.transition.ast.depCount,
                o = i.transition.ast.depCount;
              return 0 == s || 0 == o
                ? s - o
                : this._engine.driver.containsElement(r.element, i.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(t) {
          this.players.forEach((n) => n.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, t);
        }
        elementContainsData(t) {
          let n = !1;
          return (
            this._elementListeners.has(t) && (n = !0),
            (n = !!this._queue.find((r) => r.element === t) || n),
            n
          );
        }
      }
      class gO {
        constructor(t, n, r) {
          (this.bodyNode = t),
            (this.driver = n),
            (this._normalizer = r),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (i, s) => {});
        }
        _onRemovalComplete(t, n) {
          this.onRemovalComplete(t, n);
        }
        get queuedPlayers() {
          const t = [];
          return (
            this._namespaceList.forEach((n) => {
              n.players.forEach((r) => {
                r.queued && t.push(r);
              });
            }),
            t
          );
        }
        createNamespace(t, n) {
          const r = new pO(t, n, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, n)
              ? this._balanceNamespaceList(r, n)
              : (this.newHostElements.set(n, r), this.collectEnterElement(n)),
            (this._namespaceLookup[t] = r)
          );
        }
        _balanceNamespaceList(t, n) {
          const r = this._namespaceList,
            i = this.namespacesByHostElement;
          if (r.length - 1 >= 0) {
            let o = !1,
              a = this.driver.getParentElement(n);
            for (; a; ) {
              const l = i.get(a);
              if (l) {
                const u = r.indexOf(l);
                r.splice(u + 1, 0, t), (o = !0);
                break;
              }
              a = this.driver.getParentElement(a);
            }
            o || r.unshift(t);
          } else r.push(t);
          return i.set(n, t), t;
        }
        register(t, n) {
          let r = this._namespaceLookup[t];
          return r || (r = this.createNamespace(t, n)), r;
        }
        registerTrigger(t, n, r) {
          let i = this._namespaceLookup[t];
          i && i.register(n, r) && this.totalAnimations++;
        }
        destroy(t, n) {
          if (!t) return;
          const r = this._fetchNamespace(t);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(r.hostElement),
              delete this._namespaceLookup[t];
            const i = this._namespaceList.indexOf(r);
            i >= 0 && this._namespaceList.splice(i, 1);
          }),
            this.afterFlushAnimationsDone(() => r.destroy(n));
        }
        _fetchNamespace(t) {
          return this._namespaceLookup[t];
        }
        fetchNamespacesByElement(t) {
          const n = new Set(),
            r = this.statesByElement.get(t);
          if (r)
            for (let i of r.values())
              if (i.namespaceId) {
                const s = this._fetchNamespace(i.namespaceId);
                s && n.add(s);
              }
          return n;
        }
        trigger(t, n, r, i) {
          if (ll(n)) {
            const s = this._fetchNamespace(t);
            if (s) return s.trigger(n, r, i), !0;
          }
          return !1;
        }
        insertNode(t, n, r, i) {
          if (!ll(n)) return;
          const s = n[Lt];
          if (s && s.setForRemoval) {
            (s.setForRemoval = !1), (s.setForMove = !0);
            const o = this.collectedLeaveElements.indexOf(n);
            o >= 0 && this.collectedLeaveElements.splice(o, 1);
          }
          if (t) {
            const o = this._fetchNamespace(t);
            o && o.insertNode(n, r);
          }
          i && this.collectEnterElement(n);
        }
        collectEnterElement(t) {
          this.collectedEnterElements.push(t);
        }
        markElementAsDisabled(t, n) {
          n
            ? this.disabledNodes.has(t) ||
              (this.disabledNodes.add(t), kt(t, hf))
            : this.disabledNodes.has(t) &&
              (this.disabledNodes.delete(t), wi(t, hf));
        }
        removeNode(t, n, r, i) {
          if (ll(n)) {
            const s = t ? this._fetchNamespace(t) : null;
            if (
              (s ? s.removeNode(n, i) : this.markElementAsRemoved(t, n, !1, i),
              r)
            ) {
              const o = this.namespacesByHostElement.get(n);
              o && o.id !== t && o.removeNode(n, i);
            }
          } else this._onRemovalComplete(n, i);
        }
        markElementAsRemoved(t, n, r, i, s) {
          this.collectedLeaveElements.push(n),
            (n[Lt] = {
              namespaceId: t,
              setForRemoval: i,
              hasAnimation: r,
              removedBeforeQueried: !1,
              previousTriggersValues: s,
            });
        }
        listen(t, n, r, i, s) {
          return ll(n) ? this._fetchNamespace(t).listen(n, r, i, s) : () => {};
        }
        _buildInstruction(t, n, r, i, s) {
          return t.transition.build(
            this.driver,
            t.element,
            t.fromState.value,
            t.toState.value,
            r,
            i,
            t.fromState.options,
            t.toState.options,
            n,
            s
          );
        }
        destroyInnerAnimations(t) {
          let n = this.driver.query(t, Za, !0);
          n.forEach((r) => this.destroyActiveAnimationsForElement(r)),
            0 != this.playersByQueriedElement.size &&
              ((n = this.driver.query(t, ef, !0)),
              n.forEach((r) => this.finishActiveQueriedAnimationOnElement(r)));
        }
        destroyActiveAnimationsForElement(t) {
          const n = this.playersByElement.get(t);
          n &&
            n.forEach((r) => {
              r.queued ? (r.markedForDestroy = !0) : r.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(t) {
          const n = this.playersByQueriedElement.get(t);
          n && n.forEach((r) => r.finish());
        }
        whenRenderingDone() {
          return new Promise((t) => {
            if (this.players.length) return Yn(this.players).onDone(() => t());
            t();
          });
        }
        processLeaveNode(t) {
          const n = t[Lt];
          if (n && n.setForRemoval) {
            if (((t[Lt] = ND), n.namespaceId)) {
              this.destroyInnerAnimations(t);
              const r = this._fetchNamespace(n.namespaceId);
              r && r.clearElementCache(t);
            }
            this._onRemovalComplete(t, n.setForRemoval);
          }
          t.classList?.contains(hf) && this.markElementAsDisabled(t, !1),
            this.driver.query(t, ".ng-animate-disabled", !0).forEach((r) => {
              this.markElementAsDisabled(r, !1);
            });
        }
        flush(t = -1) {
          let n = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((r, i) =>
                this._balanceNamespaceList(r, i)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let r = 0; r < this.collectedEnterElements.length; r++)
              kt(this.collectedEnterElements[r], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const r = [];
            try {
              n = this._flushAnimations(r, t);
            } finally {
              for (let i = 0; i < r.length; i++) r[i]();
            }
          } else
            for (let r = 0; r < this.collectedLeaveElements.length; r++)
              this.processLeaveNode(this.collectedLeaveElements[r]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((r) => r()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const r = this._whenQuietFns;
            (this._whenQuietFns = []),
              n.length
                ? Yn(n).onDone(() => {
                    r.forEach((i) => i());
                  })
                : r.forEach((i) => i());
          }
        }
        reportError(t) {
          throw (function gP(e) {
            return new D(3402, !1);
          })();
        }
        _flushAnimations(t, n) {
          const r = new sl(),
            i = [],
            s = new Map(),
            o = [],
            a = new Map(),
            l = new Map(),
            u = new Map(),
            c = new Set();
          this.disabledNodes.forEach((S) => {
            c.add(S);
            const R = this.driver.query(S, ".ng-animate-queued", !0);
            for (let F = 0; F < R.length; F++) c.add(R[F]);
          });
          const d = this.bodyNode,
            f = Array.from(this.statesByElement.keys()),
            h = OD(f, this.collectedEnterElements),
            p = new Map();
          let g = 0;
          h.forEach((S, R) => {
            const F = Jd + g++;
            p.set(R, F), S.forEach((X) => kt(X, F));
          });
          const m = [],
            _ = new Set(),
            E = new Set();
          for (let S = 0; S < this.collectedLeaveElements.length; S++) {
            const R = this.collectedLeaveElements[S],
              F = R[Lt];
            F &&
              F.setForRemoval &&
              (m.push(R),
              _.add(R),
              F.hasAnimation
                ? this.driver
                    .query(R, ".ng-star-inserted", !0)
                    .forEach((X) => _.add(X))
                : E.add(R));
          }
          const y = new Map(),
            b = OD(f, Array.from(_));
          b.forEach((S, R) => {
            const F = Qa + g++;
            y.set(R, F), S.forEach((X) => kt(X, F));
          }),
            t.push(() => {
              h.forEach((S, R) => {
                const F = p.get(R);
                S.forEach((X) => wi(X, F));
              }),
                b.forEach((S, R) => {
                  const F = y.get(R);
                  S.forEach((X) => wi(X, F));
                }),
                m.forEach((S) => {
                  this.processLeaveNode(S);
                });
            });
          const W = [],
            Q = [];
          for (let S = this._namespaceList.length - 1; S >= 0; S--)
            this._namespaceList[S].drainQueuedTransitions(n).forEach((F) => {
              const X = F.player,
                ke = F.element;
              if ((W.push(X), this.collectedEnterElements.length)) {
                const Ye = ke[Lt];
                if (Ye && Ye.setForMove) {
                  if (
                    Ye.previousTriggersValues &&
                    Ye.previousTriggersValues.has(F.triggerName)
                  ) {
                    const Nr = Ye.previousTriggersValues.get(F.triggerName),
                      jt = this.statesByElement.get(F.element);
                    if (jt && jt.has(F.triggerName)) {
                      const Fl = jt.get(F.triggerName);
                      (Fl.value = Nr), jt.set(F.triggerName, Fl);
                    }
                  }
                  return void X.destroy();
                }
              }
              const gn = !d || !this.driver.containsElement(d, ke),
                Tt = y.get(ke),
                tr = p.get(ke),
                _e = this._buildInstruction(F, r, tr, Tt, gn);
              if (_e.errors && _e.errors.length) return void Q.push(_e);
              if (gn)
                return (
                  X.onStart(() => Er(ke, _e.fromStyles)),
                  X.onDestroy(() => hn(ke, _e.toStyles)),
                  void i.push(X)
                );
              if (F.isFallbackTransition)
                return (
                  X.onStart(() => Er(ke, _e.fromStyles)),
                  X.onDestroy(() => hn(ke, _e.toStyles)),
                  void i.push(X)
                );
              const aw = [];
              _e.timelines.forEach((Ye) => {
                (Ye.stretchStartingKeyframe = !0),
                  this.disabledNodes.has(Ye.element) || aw.push(Ye);
              }),
                (_e.timelines = aw),
                r.append(ke, _e.timelines),
                o.push({ instruction: _e, player: X, element: ke }),
                _e.queriedElements.forEach((Ye) => Et(a, Ye, []).push(X)),
                _e.preStyleProps.forEach((Ye, Nr) => {
                  if (Ye.size) {
                    let jt = l.get(Nr);
                    jt || l.set(Nr, (jt = new Set())),
                      Ye.forEach((Fl, th) => jt.add(th));
                  }
                }),
                _e.postStyleProps.forEach((Ye, Nr) => {
                  let jt = u.get(Nr);
                  jt || u.set(Nr, (jt = new Set())),
                    Ye.forEach((Fl, th) => jt.add(th));
                });
            });
          if (Q.length) {
            const S = [];
            Q.forEach((R) => {
              S.push(
                (function mP(e, t) {
                  return new D(3505, !1);
                })()
              );
            }),
              W.forEach((R) => R.destroy()),
              this.reportError(S);
          }
          const ve = new Map(),
            Ct = new Map();
          o.forEach((S) => {
            const R = S.element;
            r.has(R) &&
              (Ct.set(R, R),
              this._beforeAnimationBuild(
                S.player.namespaceId,
                S.instruction,
                ve
              ));
          }),
            i.forEach((S) => {
              const R = S.element;
              this._getPreviousPlayers(
                R,
                !1,
                S.namespaceId,
                S.triggerName,
                null
              ).forEach((X) => {
                Et(ve, R, []).push(X), X.destroy();
              });
            });
          const bt = m.filter((S) => LD(S, l, u)),
            St = new Map();
          PD(St, this.driver, E, u, An).forEach((S) => {
            LD(S, l, u) && bt.push(S);
          });
          const On = new Map();
          h.forEach((S, R) => {
            PD(On, this.driver, new Set(S), l, "!");
          }),
            bt.forEach((S) => {
              const R = St.get(S),
                F = On.get(S);
              St.set(
                S,
                new Map([
                  ...Array.from(R?.entries() ?? []),
                  ...Array.from(F?.entries() ?? []),
                ])
              );
            });
          const rn = [],
            xi = [],
            Pi = {};
          o.forEach((S) => {
            const { element: R, player: F, instruction: X } = S;
            if (r.has(R)) {
              if (c.has(R))
                return (
                  F.onDestroy(() => hn(R, X.toStyles)),
                  (F.disabled = !0),
                  F.overrideTotalTime(X.totalTime),
                  void i.push(F)
                );
              let ke = Pi;
              if (Ct.size > 1) {
                let Tt = R;
                const tr = [];
                for (; (Tt = Tt.parentNode); ) {
                  const _e = Ct.get(Tt);
                  if (_e) {
                    ke = _e;
                    break;
                  }
                  tr.push(Tt);
                }
                tr.forEach((_e) => Ct.set(_e, ke));
              }
              const gn = this._buildAnimation(F.namespaceId, X, ve, s, On, St);
              if ((F.setRealPlayer(gn), ke === Pi)) rn.push(F);
              else {
                const Tt = this.playersByElement.get(ke);
                Tt && Tt.length && (F.parentPlayer = Yn(Tt)), i.push(F);
              }
            } else
              Er(R, X.fromStyles),
                F.onDestroy(() => hn(R, X.toStyles)),
                xi.push(F),
                c.has(R) && i.push(F);
          }),
            xi.forEach((S) => {
              const R = s.get(S.element);
              if (R && R.length) {
                const F = Yn(R);
                S.setRealPlayer(F);
              }
            }),
            i.forEach((S) => {
              S.parentPlayer ? S.syncPlayerEvents(S.parentPlayer) : S.destroy();
            });
          for (let S = 0; S < m.length; S++) {
            const R = m[S],
              F = R[Lt];
            if ((wi(R, Qa), F && F.hasAnimation)) continue;
            let X = [];
            if (a.size) {
              let gn = a.get(R);
              gn && gn.length && X.push(...gn);
              let Tt = this.driver.query(R, ef, !0);
              for (let tr = 0; tr < Tt.length; tr++) {
                let _e = a.get(Tt[tr]);
                _e && _e.length && X.push(..._e);
              }
            }
            const ke = X.filter((gn) => !gn.destroyed);
            ke.length ? _O(this, R, ke) : this.processLeaveNode(R);
          }
          return (
            (m.length = 0),
            rn.forEach((S) => {
              this.players.push(S),
                S.onDone(() => {
                  S.destroy();
                  const R = this.players.indexOf(S);
                  this.players.splice(R, 1);
                }),
                S.play();
            }),
            rn
          );
        }
        elementContainsData(t, n) {
          let r = !1;
          const i = n[Lt];
          return (
            i && i.setForRemoval && (r = !0),
            this.playersByElement.has(n) && (r = !0),
            this.playersByQueriedElement.has(n) && (r = !0),
            this.statesByElement.has(n) && (r = !0),
            this._fetchNamespace(t).elementContainsData(n) || r
          );
        }
        afterFlush(t) {
          this._flushFns.push(t);
        }
        afterFlushAnimationsDone(t) {
          this._whenQuietFns.push(t);
        }
        _getPreviousPlayers(t, n, r, i, s) {
          let o = [];
          if (n) {
            const a = this.playersByQueriedElement.get(t);
            a && (o = a);
          } else {
            const a = this.playersByElement.get(t);
            if (a) {
              const l = !s || s == Bs;
              a.forEach((u) => {
                u.queued || (!l && u.triggerName != i) || o.push(u);
              });
            }
          }
          return (
            (r || i) &&
              (o = o.filter(
                (a) => !((r && r != a.namespaceId) || (i && i != a.triggerName))
              )),
            o
          );
        }
        _beforeAnimationBuild(t, n, r) {
          const s = n.element,
            o = n.isRemovalTransition ? void 0 : t,
            a = n.isRemovalTransition ? void 0 : n.triggerName;
          for (const l of n.timelines) {
            const u = l.element,
              c = u !== s,
              d = Et(r, u, []);
            this._getPreviousPlayers(u, c, o, a, n.toState).forEach((h) => {
              const p = h.getRealPlayer();
              p.beforeDestroy && p.beforeDestroy(), h.destroy(), d.push(h);
            });
          }
          Er(s, n.fromStyles);
        }
        _buildAnimation(t, n, r, i, s, o) {
          const a = n.triggerName,
            l = n.element,
            u = [],
            c = new Set(),
            d = new Set(),
            f = n.timelines.map((p) => {
              const g = p.element;
              c.add(g);
              const m = g[Lt];
              if (m && m.removedBeforeQueried)
                return new Fs(p.duration, p.delay);
              const _ = g !== l,
                E = (function DO(e) {
                  const t = [];
                  return FD(e, t), t;
                })((r.get(g) || fO).map((ve) => ve.getRealPlayer())).filter(
                  (ve) => !!ve.element && ve.element === g
                ),
                y = s.get(g),
                b = o.get(g),
                W = aD(0, this._normalizer, 0, p.keyframes, y, b),
                Q = this._buildPlayer(p, W, E);
              if ((p.subTimeline && i && d.add(g), _)) {
                const ve = new mf(t, a, g);
                ve.setRealPlayer(Q), u.push(ve);
              }
              return Q;
            });
          u.forEach((p) => {
            Et(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function mO(e, t, n) {
                  let r = e.get(t);
                  if (r) {
                    if (r.length) {
                      const i = r.indexOf(n);
                      r.splice(i, 1);
                    }
                    0 == r.length && e.delete(t);
                  }
                  return r;
                })(this.playersByQueriedElement, p.element, p)
              );
          }),
            c.forEach((p) => kt(p, mD));
          const h = Yn(f);
          return (
            h.onDestroy(() => {
              c.forEach((p) => wi(p, mD)), hn(l, n.toStyles);
            }),
            d.forEach((p) => {
              Et(i, p, []).push(h);
            }),
            h
          );
        }
        _buildPlayer(t, n, r) {
          return n.length > 0
            ? this.driver.animate(
                t.element,
                n,
                t.duration,
                t.delay,
                t.easing,
                r
              )
            : new Fs(t.duration, t.delay);
        }
      }
      class mf {
        constructor(t, n, r) {
          (this.namespaceId = t),
            (this.triggerName = n),
            (this.element = r),
            (this._player = new Fs()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = new Map()),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(t) {
          this._containsRealPlayer ||
            ((this._player = t),
            this._queuedCallbacks.forEach((n, r) => {
              n.forEach((i) => qd(t, r, void 0, i));
            }),
            this._queuedCallbacks.clear(),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(t.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(t) {
          this.totalTime = t;
        }
        syncPlayerEvents(t) {
          const n = this._player;
          n.triggerCallback && t.onStart(() => n.triggerCallback("start")),
            t.onDone(() => this.finish()),
            t.onDestroy(() => this.destroy());
        }
        _queueEvent(t, n) {
          Et(this._queuedCallbacks, t, []).push(n);
        }
        onDone(t) {
          this.queued && this._queueEvent("done", t), this._player.onDone(t);
        }
        onStart(t) {
          this.queued && this._queueEvent("start", t), this._player.onStart(t);
        }
        onDestroy(t) {
          this.queued && this._queueEvent("destroy", t),
            this._player.onDestroy(t);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(t) {
          this.queued || this._player.setPosition(t);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(t) {
          const n = this._player;
          n.triggerCallback && n.triggerCallback(t);
        }
      }
      function ll(e) {
        return e && 1 === e.nodeType;
      }
      function xD(e, t) {
        const n = e.style.display;
        return (e.style.display = t ?? "none"), n;
      }
      function PD(e, t, n, r, i) {
        const s = [];
        n.forEach((l) => s.push(xD(l)));
        const o = [];
        r.forEach((l, u) => {
          const c = new Map();
          l.forEach((d) => {
            const f = t.computeStyle(u, d, i);
            c.set(d, f), (!f || 0 == f.length) && ((u[Lt] = hO), o.push(u));
          }),
            e.set(u, c);
        });
        let a = 0;
        return n.forEach((l) => xD(l, s[a++])), o;
      }
      function OD(e, t) {
        const n = new Map();
        if ((e.forEach((a) => n.set(a, [])), 0 == t.length)) return n;
        const i = new Set(t),
          s = new Map();
        function o(a) {
          if (!a) return 1;
          let l = s.get(a);
          if (l) return l;
          const u = a.parentNode;
          return (l = n.has(u) ? u : i.has(u) ? 1 : o(u)), s.set(a, l), l;
        }
        return (
          t.forEach((a) => {
            const l = o(a);
            1 !== l && n.get(l).push(a);
          }),
          n
        );
      }
      function kt(e, t) {
        e.classList?.add(t);
      }
      function wi(e, t) {
        e.classList?.remove(t);
      }
      function _O(e, t, n) {
        Yn(n).onDone(() => e.processLeaveNode(t));
      }
      function FD(e, t) {
        for (let n = 0; n < e.length; n++) {
          const r = e[n];
          r instanceof sD ? FD(r.players, t) : t.push(r);
        }
      }
      function LD(e, t, n) {
        const r = n.get(e);
        if (!r) return !1;
        let i = t.get(e);
        return i ? r.forEach((s) => i.add(s)) : t.set(e, r), n.delete(e), !0;
      }
      class ul {
        constructor(t, n, r) {
          (this.bodyNode = t),
            (this._driver = n),
            (this._normalizer = r),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (i, s) => {}),
            (this._transitionEngine = new gO(t, n, r)),
            (this._timelineEngine = new aO(t, n, r)),
            (this._transitionEngine.onRemovalComplete = (i, s) =>
              this.onRemovalComplete(i, s));
        }
        registerTrigger(t, n, r, i, s) {
          const o = t + "-" + i;
          let a = this._triggerCache[o];
          if (!a) {
            const l = [],
              c = sf(this._driver, s, l, []);
            if (l.length)
              throw (function sP(e, t) {
                return new D(3404, !1);
              })();
            (a = (function rO(e, t, n) {
              return new iO(e, t, n);
            })(i, c, this._normalizer)),
              (this._triggerCache[o] = a);
          }
          this._transitionEngine.registerTrigger(n, i, a);
        }
        register(t, n) {
          this._transitionEngine.register(t, n);
        }
        destroy(t, n) {
          this._transitionEngine.destroy(t, n);
        }
        onInsert(t, n, r, i) {
          this._transitionEngine.insertNode(t, n, r, i);
        }
        onRemove(t, n, r, i) {
          this._transitionEngine.removeNode(t, n, i || !1, r);
        }
        disableAnimations(t, n) {
          this._transitionEngine.markElementAsDisabled(t, n);
        }
        process(t, n, r, i) {
          if ("@" == r.charAt(0)) {
            const [s, o] = lD(r);
            this._timelineEngine.command(s, n, o, i);
          } else this._transitionEngine.trigger(t, n, r, i);
        }
        listen(t, n, r, i, s) {
          if ("@" == r.charAt(0)) {
            const [o, a] = lD(r);
            return this._timelineEngine.listen(o, n, a, s);
          }
          return this._transitionEngine.listen(t, n, r, i, s);
        }
        flush(t = -1) {
          this._transitionEngine.flush(t);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      let CO = (() => {
        class e {
          constructor(n, r, i) {
            (this._element = n),
              (this._startStyles = r),
              (this._endStyles = i),
              (this._state = 0);
            let s = e.initialStylesByElement.get(n);
            s || e.initialStylesByElement.set(n, (s = new Map())),
              (this._initialStyles = s);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                hn(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (hn(this._element, this._initialStyles),
                this._endStyles &&
                  (hn(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (e.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (Er(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (Er(this._element, this._endStyles),
                  (this._endStyles = null)),
                hn(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (e.initialStylesByElement = new WeakMap()), e;
      })();
      function yf(e) {
        let t = null;
        return (
          e.forEach((n, r) => {
            (function bO(e) {
              return "display" === e || "position" === e;
            })(r) && ((t = t || new Map()), t.set(r, n));
          }),
          t
        );
      }
      class kD {
        constructor(t, n, r, i) {
          (this.element = t),
            (this.keyframes = n),
            (this.options = r),
            (this._specialStyles = i),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = new Map()),
            (this._duration = r.duration),
            (this._delay = r.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const t = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            t,
            this.options
          )),
            (this._finalKeyframe = t.length ? t[t.length - 1] : new Map()),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _convertKeyframesToObject(t) {
          const n = [];
          return (
            t.forEach((r) => {
              n.push(Object.fromEntries(r));
            }),
            n
          );
        }
        _triggerWebAnimation(t, n, r) {
          return t.animate(this._convertKeyframesToObject(n), r);
        }
        onStart(t) {
          this._originalOnStartFns.push(t), this._onStartFns.push(t);
        }
        onDone(t) {
          this._originalOnDoneFns.push(t), this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((t) => t()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        setPosition(t) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = t * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const t = new Map();
          this.hasStarted() &&
            this._finalKeyframe.forEach((r, i) => {
              "offset" !== i &&
                t.set(i, this._finished ? r : wD(this.element, i));
            }),
            (this.currentSnapshot = t);
        }
        triggerCallback(t) {
          const n = "start" === t ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      class SO {
        validateStyleProperty(t) {
          return !0;
        }
        validateAnimatableStyleProperty(t) {
          return !0;
        }
        matchesElement(t, n) {
          return !1;
        }
        containsElement(t, n) {
          return fD(t, n);
        }
        getParentElement(t) {
          return Zd(t);
        }
        query(t, n, r) {
          return hD(t, n, r);
        }
        computeStyle(t, n, r) {
          return window.getComputedStyle(t)[n];
        }
        animate(t, n, r, i, s, o = []) {
          const l = {
            duration: r,
            delay: i,
            fill: 0 == i ? "both" : "forwards",
          };
          s && (l.easing = s);
          const u = new Map(),
            c = o.filter((h) => h instanceof kD);
          (function AP(e, t) {
            return 0 === e || 0 === t;
          })(r, i) &&
            c.forEach((h) => {
              h.currentSnapshot.forEach((p, g) => u.set(g, p));
            });
          let d = (function SP(e) {
            return e.length
              ? e[0] instanceof Map
                ? e
                : e.map((t) => yD(t))
              : [];
          })(n).map((h) => Zn(h));
          d = (function RP(e, t, n) {
            if (n.size && t.length) {
              let r = t[0],
                i = [];
              if (
                (n.forEach((s, o) => {
                  r.has(o) || i.push(o), r.set(o, s);
                }),
                i.length)
              )
                for (let s = 1; s < t.length; s++) {
                  let o = t[s];
                  i.forEach((a) => o.set(a, wD(e, a)));
                }
            }
            return t;
          })(t, d, u);
          const f = (function wO(e, t) {
            let n = null,
              r = null;
            return (
              Array.isArray(t) && t.length
                ? ((n = yf(t[0])), t.length > 1 && (r = yf(t[t.length - 1])))
                : t instanceof Map && (n = yf(t)),
              n || r ? new CO(e, n, r) : null
            );
          })(t, d);
          return new kD(t, d, l, f);
        }
      }
      let TO = (() => {
        class e extends eD {
          constructor(n, r) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = n.createRenderer(r.body, {
                id: "0",
                encapsulation: Ht.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(n) {
            const r = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const i = Array.isArray(n) ? nD(n) : n;
            return (
              VD(this._renderer, null, r, "register", [i]),
              new IO(r, this._renderer)
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(cs), I(Le));
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class IO extends class Fx {} {
        constructor(t, n) {
          super(), (this._id = t), (this._renderer = n);
        }
        create(t, n) {
          return new MO(this._id, t, n || {}, this._renderer);
        }
      }
      class MO {
        constructor(t, n, r, i) {
          (this.id = t),
            (this.element = n),
            (this._renderer = i),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", r);
        }
        _listen(t, n) {
          return this._renderer.listen(this.element, `@@${this.id}:${t}`, n);
        }
        _command(t, ...n) {
          return VD(this._renderer, this.element, this.id, t, n);
        }
        onDone(t) {
          this._listen("done", t);
        }
        onStart(t) {
          this._listen("start", t);
        }
        onDestroy(t) {
          this._listen("destroy", t);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset"), (this._started = !1);
        }
        setPosition(t) {
          this._command("setPosition", t);
        }
        getPosition() {
          return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
        }
      }
      function VD(e, t, n, r, i) {
        return e.setProperty(t, `@@${n}:${r}`, i);
      }
      const BD = "@.disabled";
      let AO = (() => {
        class e {
          constructor(n, r, i) {
            (this.delegate = n),
              (this.engine = r),
              (this._zone = i),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (r.onRemovalComplete = (s, o) => {
                const a = o?.parentNode(s);
                a && o.removeChild(a, s);
              });
          }
          createRenderer(n, r) {
            const s = this.delegate.createRenderer(n, r);
            if (!(n && r && r.data && r.data.animation)) {
              let c = this._rendererCache.get(s);
              return (
                c ||
                  ((c = new jD("", s, this.engine, () =>
                    this._rendererCache.delete(s)
                  )),
                  this._rendererCache.set(s, c)),
                c
              );
            }
            const o = r.id,
              a = r.id + "-" + this._currentId;
            this._currentId++, this.engine.register(a, n);
            const l = (c) => {
              Array.isArray(c)
                ? c.forEach(l)
                : this.engine.registerTrigger(o, a, n, c.name, c);
            };
            return r.data.animation.forEach(l), new RO(this, a, s, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(n, r, i) {
            n >= 0 && n < this._microtaskId
              ? this._zone.run(() => r(i))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((s) => {
                        const [o, a] = s;
                        o(a);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([r, i]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(cs), I(ul), I(Se));
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class jD {
        constructor(t, n, r, i) {
          (this.namespaceId = t),
            (this.delegate = n),
            (this.engine = r),
            (this._onDestroy = i),
            (this.destroyNode = this.delegate.destroyNode
              ? (s) => n.destroyNode(s)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy(),
            this._onDestroy?.();
        }
        createElement(t, n) {
          return this.delegate.createElement(t, n);
        }
        createComment(t) {
          return this.delegate.createComment(t);
        }
        createText(t) {
          return this.delegate.createText(t);
        }
        appendChild(t, n) {
          this.delegate.appendChild(t, n),
            this.engine.onInsert(this.namespaceId, n, t, !1);
        }
        insertBefore(t, n, r, i = !0) {
          this.delegate.insertBefore(t, n, r),
            this.engine.onInsert(this.namespaceId, n, t, i);
        }
        removeChild(t, n, r) {
          this.engine.onRemove(this.namespaceId, n, this.delegate, r);
        }
        selectRootElement(t, n) {
          return this.delegate.selectRootElement(t, n);
        }
        parentNode(t) {
          return this.delegate.parentNode(t);
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t);
        }
        setAttribute(t, n, r, i) {
          this.delegate.setAttribute(t, n, r, i);
        }
        removeAttribute(t, n, r) {
          this.delegate.removeAttribute(t, n, r);
        }
        addClass(t, n) {
          this.delegate.addClass(t, n);
        }
        removeClass(t, n) {
          this.delegate.removeClass(t, n);
        }
        setStyle(t, n, r, i) {
          this.delegate.setStyle(t, n, r, i);
        }
        removeStyle(t, n, r) {
          this.delegate.removeStyle(t, n, r);
        }
        setProperty(t, n, r) {
          "@" == n.charAt(0) && n == BD
            ? this.disableAnimations(t, !!r)
            : this.delegate.setProperty(t, n, r);
        }
        setValue(t, n) {
          this.delegate.setValue(t, n);
        }
        listen(t, n, r) {
          return this.delegate.listen(t, n, r);
        }
        disableAnimations(t, n) {
          this.engine.disableAnimations(t, n);
        }
      }
      class RO extends jD {
        constructor(t, n, r, i, s) {
          super(n, r, i, s), (this.factory = t), (this.namespaceId = n);
        }
        setProperty(t, n, r) {
          "@" == n.charAt(0)
            ? "." == n.charAt(1) && n == BD
              ? this.disableAnimations(t, (r = void 0 === r || !!r))
              : this.engine.process(this.namespaceId, t, n.slice(1), r)
            : this.delegate.setProperty(t, n, r);
        }
        listen(t, n, r) {
          if ("@" == n.charAt(0)) {
            const i = (function NO(e) {
              switch (e) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return e;
              }
            })(t);
            let s = n.slice(1),
              o = "";
            return (
              "@" != s.charAt(0) &&
                ([s, o] = (function xO(e) {
                  const t = e.indexOf(".");
                  return [e.substring(0, t), e.slice(t + 1)];
                })(s)),
              this.engine.listen(this.namespaceId, i, s, o, (a) => {
                this.factory.scheduleListenerCallback(a._data || -1, r, a);
              })
            );
          }
          return this.delegate.listen(t, n, r);
        }
      }
      let PO = (() => {
        class e extends ul {
          constructor(n, r, i, s) {
            super(n.body, r, i);
          }
          ngOnDestroy() {
            this.flush();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(Le), I(Xd), I(df), I(Is));
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const $D = [
          { provide: eD, useClass: TO },
          {
            provide: df,
            useFactory: function OO() {
              return new JP();
            },
          },
          { provide: ul, useClass: PO },
          {
            provide: cs,
            useFactory: function FO(e, t, n) {
              return new AO(e, t, n);
            },
            deps: [Ka, ul, Se],
          },
        ],
        vf = [
          { provide: Xd, useFactory: () => new SO() },
          { provide: Pv, useValue: "BrowserAnimations" },
          ...$D,
        ],
        UD = [
          { provide: Xd, useClass: pD },
          { provide: Pv, useValue: "NoopAnimations" },
          ...$D,
        ];
      let LO = (() => {
        class e {
          static withConfig(n) {
            return { ngModule: e, providers: n.disableAnimations ? UD : vf };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Ze({ type: e })),
          (e.ɵinj = He({ providers: vf, imports: [K_] })),
          e
        );
      })();
      function A(...e) {
        let t = e[e.length - 1];
        return so(t) ? (e.pop(), kl(e, t)) : Vl(e);
      }
      class Vt extends $t {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return n && !n.closed && t.next(this._value), n;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new xr();
          return this._value;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const dl = (() => {
        function e() {
          return (
            Error.call(this),
            (this.message = "no elements in sequence"),
            (this.name = "EmptyError"),
            this
          );
        }
        return (e.prototype = Object.create(Error.prototype)), e;
      })();
      class kO extends fe {
        notifyNext(t, n, r, i, s) {
          this.destination.next(n);
        }
        notifyError(t, n) {
          this.destination.error(t);
        }
        notifyComplete(t) {
          this.destination.complete();
        }
      }
      class VO extends fe {
        constructor(t, n, r) {
          super(),
            (this.parent = t),
            (this.outerValue = n),
            (this.outerIndex = r),
            (this.index = 0);
        }
        _next(t) {
          this.parent.notifyNext(
            this.outerValue,
            t,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      function BO(e, t, n, r, i = new VO(e, n, r)) {
        if (!i.closed) return t instanceof Ce ? t.subscribe(i) : Ll(t)(i);
      }
      const HD = {};
      function zD(...e) {
        let t, n;
        return (
          so(e[e.length - 1]) && (n = e.pop()),
          "function" == typeof e[e.length - 1] && (t = e.pop()),
          1 === e.length && nh(e[0]) && (e = e[0]),
          Vl(e, n).lift(new jO(t))
        );
      }
      class jO {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, n) {
          return n.subscribe(new $O(t, this.resultSelector));
        }
      }
      class $O extends kO {
        constructor(t, n) {
          super(t),
            (this.resultSelector = n),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(t) {
          this.values.push(HD), this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            n = t.length;
          if (0 === n) this.destination.complete();
          else {
            (this.active = n), (this.toRespond = n);
            for (let r = 0; r < n; r++) this.add(BO(this, t[r], void 0, r));
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(t, n, r) {
          const i = this.values,
            o = this.toRespond
              ? i[r] === HD
                ? --this.toRespond
                : this.toRespond
              : 0;
          (i[r] = n),
            0 === o &&
              (this.resultSelector
                ? this._tryResultSelector(i)
                : this.destination.next(i.slice()));
        }
        _tryResultSelector(t) {
          let n;
          try {
            n = this.resultSelector.apply(this, t);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.destination.next(n);
        }
      }
      function _f(...e) {
        return (function UO() {
          return Pr(1);
        })()(A(...e));
      }
      const Ci = new Ce((e) => e.complete());
      function Df(e) {
        return e
          ? (function HO(e) {
              return new Ce((t) => e.schedule(() => t.complete()));
            })(e)
          : Ci;
      }
      function WD(e) {
        return new Ce((t) => {
          let n;
          try {
            n = e();
          } catch (i) {
            return void t.error(i);
          }
          return (n ? Ve(n) : Df()).subscribe(t);
        });
      }
      function js(e, t) {
        return new Ce(
          t
            ? (n) => t.schedule(zO, 0, { error: e, subscriber: n })
            : (n) => n.error(e)
        );
      }
      function zO({ error: e, subscriber: t }) {
        t.error(e);
      }
      function nn(e, t) {
        return "function" == typeof t
          ? (n) =>
              n.pipe(nn((r, i) => Ve(e(r, i)).pipe(J((s, o) => t(r, s, i, o)))))
          : (n) => n.lift(new WO(e));
      }
      class WO {
        constructor(t) {
          this.project = t;
        }
        call(t, n) {
          return n.subscribe(new GO(t, this.project));
        }
      }
      class GO extends lo {
        constructor(t, n) {
          super(t), (this.project = n), (this.index = 0);
        }
        _next(t) {
          let n;
          const r = this.index++;
          try {
            n = this.project(t, r);
          } catch (i) {
            return void this.destination.error(i);
          }
          this._innerSub(n);
        }
        _innerSub(t) {
          const n = this.innerSubscription;
          n && n.unsubscribe();
          const r = new ao(this),
            i = this.destination;
          i.add(r),
            (this.innerSubscription = uo(t, r)),
            this.innerSubscription !== r && i.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: t } = this;
          (!t || t.closed) && super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = void 0;
        }
        notifyComplete() {
          (this.innerSubscription = void 0),
            this.isStopped && super._complete();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
      }
      const GD = (() => {
        function e() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          );
        }
        return (e.prototype = Object.create(Error.prototype)), e;
      })();
      function $s(e) {
        return (t) => (0 === e ? Df() : t.lift(new qO(e)));
      }
      class qO {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new GD();
        }
        call(t, n) {
          return n.subscribe(new KO(t, this.total));
        }
      }
      class KO extends fe {
        constructor(t, n) {
          super(t), (this.total = n), (this.count = 0);
        }
        _next(t) {
          const n = this.total,
            r = ++this.count;
          r <= n &&
            (this.destination.next(t),
            r === n && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function Nn(e, t) {
        return function (r) {
          return r.lift(new YO(e, t));
        };
      }
      class YO {
        constructor(t, n) {
          (this.predicate = t), (this.thisArg = n);
        }
        call(t, n) {
          return n.subscribe(new ZO(t, this.predicate, this.thisArg));
        }
      }
      class ZO extends fe {
        constructor(t, n, r) {
          super(t), (this.predicate = n), (this.thisArg = r), (this.count = 0);
        }
        _next(t) {
          let n;
          try {
            n = this.predicate.call(this.thisArg, t, this.count++);
          } catch (r) {
            return void this.destination.error(r);
          }
          n && this.destination.next(t);
        }
      }
      function fl(e = null) {
        return (t) => t.lift(new XO(e));
      }
      class XO {
        constructor(t) {
          this.defaultValue = t;
        }
        call(t, n) {
          return n.subscribe(new JO(t, this.defaultValue));
        }
      }
      class JO extends fe {
        constructor(t, n) {
          super(t), (this.defaultValue = n), (this.isEmpty = !0);
        }
        _next(t) {
          (this.isEmpty = !1), this.destination.next(t);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function qD(e = n1) {
        return (t) => t.lift(new e1(e));
      }
      class e1 {
        constructor(t) {
          this.errorFactory = t;
        }
        call(t, n) {
          return n.subscribe(new t1(t, this.errorFactory));
        }
      }
      class t1 extends fe {
        constructor(t, n) {
          super(t), (this.errorFactory = n), (this.hasValue = !1);
        }
        _next(t) {
          (this.hasValue = !0), this.destination.next(t);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let t;
            try {
              t = this.errorFactory();
            } catch (n) {
              t = n;
            }
            this.destination.error(t);
          }
        }
      }
      function n1() {
        return new dl();
      }
      function Xn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Nn((i, s) => e(i, s, r)) : io,
            $s(1),
            n ? fl(t) : qD(() => new dl())
          );
      }
      function Cr(e, t) {
        return Ue(e, t, 1);
      }
      function Jn() {}
      function Qe(e, t, n) {
        return function (i) {
          return i.lift(new r1(e, t, n));
        };
      }
      class r1 {
        constructor(t, n, r) {
          (this.nextOrObserver = t), (this.error = n), (this.complete = r);
        }
        call(t, n) {
          return n.subscribe(
            new s1(t, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class s1 extends fe {
        constructor(t, n, r, i) {
          super(t),
            (this._tapNext = Jn),
            (this._tapError = Jn),
            (this._tapComplete = Jn),
            (this._tapError = r || Jn),
            (this._tapComplete = i || Jn),
            nr(n)
              ? ((this._context = this), (this._tapNext = n))
              : n &&
                ((this._context = n),
                (this._tapNext = n.next || Jn),
                (this._tapError = n.error || Jn),
                (this._tapComplete = n.complete || Jn));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
      function br(e) {
        return function (n) {
          const r = new o1(e),
            i = n.lift(r);
          return (r.caught = i);
        };
      }
      class o1 {
        constructor(t) {
          this.selector = t;
        }
        call(t, n) {
          return n.subscribe(new a1(t, this.selector, this.caught));
        }
      }
      class a1 extends lo {
        constructor(t, n, r) {
          super(t), (this.selector = n), (this.caught = r);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (s) {
              return void super.error(s);
            }
            this._unsubscribeAndRecycle();
            const r = new ao(this);
            this.add(r);
            const i = uo(n, r);
            i !== r && this.add(i);
          }
        }
      }
      function KD(e, t) {
        let n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function (i) {
            return i.lift(new l1(e, t, n));
          }
        );
      }
      class l1 {
        constructor(t, n, r = !1) {
          (this.accumulator = t), (this.seed = n), (this.hasSeed = r);
        }
        call(t, n) {
          return n.subscribe(
            new u1(t, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class u1 extends fe {
        constructor(t, n, r, i) {
          super(t),
            (this.accumulator = n),
            (this._seed = r),
            (this.hasSeed = i),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(t) {
          (this.hasSeed = !0), (this._seed = t);
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t);
          (this.seed = t), this.destination.next(t);
        }
        _tryNext(t) {
          const n = this.index++;
          let r;
          try {
            r = this.accumulator(this.seed, t, n);
          } catch (i) {
            this.destination.error(i);
          }
          (this.seed = r), this.destination.next(r);
        }
      }
      function Ef(e) {
        return function (n) {
          return 0 === e ? Df() : n.lift(new c1(e));
        };
      }
      class c1 {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new GD();
        }
        call(t, n) {
          return n.subscribe(new d1(t, this.total));
        }
      }
      class d1 extends fe {
        constructor(t, n) {
          super(t),
            (this.total = n),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(t) {
          const n = this.ring,
            r = this.total,
            i = this.count++;
          n.length < r ? n.push(t) : (n[i % r] = t);
        }
        _complete() {
          const t = this.destination;
          let n = this.count;
          if (n > 0) {
            const r = this.count >= this.total ? this.total : this.count,
              i = this.ring;
            for (let s = 0; s < r; s++) {
              const o = n++ % r;
              t.next(i[o]);
            }
          }
          t.complete();
        }
      }
      function QD(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Nn((i, s) => e(i, s, r)) : io,
            Ef(1),
            n ? fl(t) : qD(() => new dl())
          );
      }
      class h1 {
        constructor(t, n) {
          (this.predicate = t), (this.inclusive = n);
        }
        call(t, n) {
          return n.subscribe(new p1(t, this.predicate, this.inclusive));
        }
      }
      class p1 extends fe {
        constructor(t, n, r) {
          super(t),
            (this.predicate = n),
            (this.inclusive = r),
            (this.index = 0);
        }
        _next(t) {
          const n = this.destination;
          let r;
          try {
            r = this.predicate(t, this.index++);
          } catch (i) {
            return void n.error(i);
          }
          this.nextOrComplete(t, r);
        }
        nextOrComplete(t, n) {
          const r = this.destination;
          Boolean(n) ? r.next(t) : (this.inclusive && r.next(t), r.complete());
        }
      }
      class m1 {
        constructor(t) {
          this.value = t;
        }
        call(t, n) {
          return n.subscribe(new y1(t, this.value));
        }
      }
      class y1 extends fe {
        constructor(t, n) {
          super(t), (this.value = n);
        }
        _next(t) {
          this.destination.next(this.value);
        }
      }
      function wf(e) {
        return (t) => t.lift(new v1(e));
      }
      class v1 {
        constructor(t) {
          this.callback = t;
        }
        call(t, n) {
          return n.subscribe(new _1(t, this.callback));
        }
      }
      class _1 extends fe {
        constructor(t, n) {
          super(t), this.add(new De(n));
        }
      }
      const G = "primary",
        Us = Symbol("RouteTitle");
      class D1 {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function bi(e) {
        return new D1(e);
      }
      function E1(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const i = {};
        for (let s = 0; s < r.length; s++) {
          const o = r[s],
            a = e[s];
          if (o.startsWith(":")) i[o.substring(1)] = a;
          else if (o !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: i };
      }
      function pn(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let i;
        for (let s = 0; s < n.length; s++)
          if (((i = n[s]), !YD(e[i], t[i]))) return !1;
        return !0;
      }
      function YD(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((i, s) => r[s] === i);
        }
        return e === t;
      }
      function ZD(e) {
        return Array.prototype.concat.apply([], e);
      }
      function XD(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function je(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function er(e) {
        return ym(e) ? e : ua(e) ? Ve(Promise.resolve(e)) : A(e);
      }
      const b1 = {
          exact: function tE(e, t, n) {
            if (
              !Tr(e.segments, t.segments) ||
              !hl(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !tE(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: nE,
        },
        JD = {
          exact: function S1(e, t) {
            return pn(e, t);
          },
          subset: function T1(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => YD(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function eE(e, t, n) {
        return (
          b1[n.paths](e.root, t.root, n.matrixParams) &&
          JD[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function nE(e, t, n) {
        return rE(e, t, t.segments, n);
      }
      function rE(e, t, n, r) {
        if (e.segments.length > n.length) {
          const i = e.segments.slice(0, n.length);
          return !(!Tr(i, n) || t.hasChildren() || !hl(i, n, r));
        }
        if (e.segments.length === n.length) {
          if (!Tr(e.segments, n) || !hl(e.segments, n, r)) return !1;
          for (const i in t.children)
            if (!e.children[i] || !nE(e.children[i], t.children[i], r))
              return !1;
          return !0;
        }
        {
          const i = n.slice(0, e.segments.length),
            s = n.slice(e.segments.length);
          return (
            !!(Tr(e.segments, i) && hl(e.segments, i, r) && e.children[G]) &&
            rE(e.children[G], t, s, r)
          );
        }
      }
      function hl(e, t, n) {
        return t.every((r, i) => JD[n](e[i].parameters, r.parameters));
      }
      class Sr {
        constructor(t, n, r) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = bi(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return A1.serialize(this);
        }
      }
      class q {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            je(n, (r, i) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return pl(this);
        }
      }
      class Hs {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = bi(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return aE(this);
        }
      }
      function Tr(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let iE = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = V({
            token: e,
            factory: function () {
              return new bf();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class bf {
        parse(t) {
          const n = new V1(t);
          return new Sr(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${zs(t.root, !0)}`,
            r = (function x1(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((i) => `${gl(n)}=${gl(i)}`).join("&")
                    : `${gl(n)}=${gl(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams),
            i =
              "string" == typeof t.fragment
                ? `#${(function R1(e) {
                    return encodeURI(e);
                  })(t.fragment)}`
                : "";
          return `${n}${r}${i}`;
        }
      }
      const A1 = new bf();
      function pl(e) {
        return e.segments.map((t) => aE(t)).join("/");
      }
      function zs(e, t) {
        if (!e.hasChildren()) return pl(e);
        if (t) {
          const n = e.children[G] ? zs(e.children[G], !1) : "",
            r = [];
          return (
            je(e.children, (i, s) => {
              s !== G && r.push(`${s}:${zs(i, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function M1(e, t) {
            let n = [];
            return (
              je(e.children, (r, i) => {
                i === G && (n = n.concat(t(r, i)));
              }),
              je(e.children, (r, i) => {
                i !== G && (n = n.concat(t(r, i)));
              }),
              n
            );
          })(e, (r, i) =>
            i === G ? [zs(e.children[G], !1)] : [`${i}:${zs(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[G]
            ? `${pl(e)}/${n[0]}`
            : `${pl(e)}/(${n.join("//")})`;
        }
      }
      function sE(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function gl(e) {
        return sE(e).replace(/%3B/gi, ";");
      }
      function Sf(e) {
        return sE(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function ml(e) {
        return decodeURIComponent(e);
      }
      function oE(e) {
        return ml(e.replace(/\+/g, "%20"));
      }
      function aE(e) {
        return `${Sf(e.path)}${(function N1(e) {
          return Object.keys(e)
            .map((t) => `;${Sf(t)}=${Sf(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const P1 = /^[^\/()?;=#]+/;
      function yl(e) {
        const t = e.match(P1);
        return t ? t[0] : "";
      }
      const O1 = /^[^=?&#]+/,
        L1 = /^[^&#]+/;
      class V1 {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new q([], {})
              : new q([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[G] = new q(t, n)),
            r
          );
        }
        parseSegment() {
          const t = yl(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new D(4009, !1);
          return this.capture(t), new Hs(ml(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = yl(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const i = yl(this.remaining);
            i && ((r = i), this.capture(r));
          }
          t[ml(n)] = ml(r);
        }
        parseQueryParam(t) {
          const n = (function F1(e) {
            const t = e.match(O1);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = (function k1(e) {
              const t = e.match(L1);
              return t ? t[0] : "";
            })(this.remaining);
            o && ((r = o), this.capture(r));
          }
          const i = oE(n),
            s = oE(r);
          if (t.hasOwnProperty(i)) {
            let o = t[i];
            Array.isArray(o) || ((o = [o]), (t[i] = o)), o.push(s);
          } else t[i] = s;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = yl(this.remaining),
              i = this.remaining[r.length];
            if ("/" !== i && ")" !== i && ";" !== i) throw new D(4010, !1);
            let s;
            r.indexOf(":") > -1
              ? ((s = r.slice(0, r.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : t && (s = G);
            const o = this.parseChildren();
            (n[s] = 1 === Object.keys(o).length ? o[G] : new q([], o)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new D(4011, !1);
        }
      }
      function Tf(e) {
        return e.segments.length > 0 ? new q([], { [G]: e }) : e;
      }
      function vl(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const s = vl(e.children[r]);
          (s.segments.length > 0 || s.hasChildren()) && (t[r] = s);
        }
        return (function B1(e) {
          if (1 === e.numberOfChildren && e.children[G]) {
            const t = e.children[G];
            return new q(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new q(e.segments, t));
      }
      function Ir(e) {
        return e instanceof Sr;
      }
      function U1(e, t, n, r, i) {
        if (0 === n.length) return Si(t.root, t.root, t.root, r, i);
        const s = (function cE(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new uE(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((i, s, o) => {
            if ("object" == typeof s && null != s) {
              if (s.outlets) {
                const a = {};
                return (
                  je(s.outlets, (l, u) => {
                    a[u] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...i, { outlets: a }]
                );
              }
              if (s.segmentPath) return [...i, s.segmentPath];
            }
            return "string" != typeof s
              ? [...i, s]
              : 0 === o
              ? (s.split("/").forEach((a, l) => {
                  (0 == l && "." === a) ||
                    (0 == l && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && i.push(a));
                }),
                i)
              : [...i, s];
          }, []);
          return new uE(n, t, r);
        })(n);
        return s.toRoot()
          ? Si(t.root, t.root, new q([], {}), r, i)
          : (function o(l) {
              const u = (function z1(e, t, n, r) {
                  if (e.isAbsolute) return new Ti(t.root, !0, 0);
                  if (-1 === r) return new Ti(n, n === t.root, 0);
                  return (function dE(e, t, n) {
                    let r = e,
                      i = t,
                      s = n;
                    for (; s > i; ) {
                      if (((s -= i), (r = r.parent), !r)) throw new D(4005, !1);
                      i = r.segments.length;
                    }
                    return new Ti(r, !1, i - s);
                  })(n, r + (Ws(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(s, t, e.snapshot?._urlSegment, l),
                c = u.processChildren
                  ? qs(u.segmentGroup, u.index, s.commands)
                  : Mf(u.segmentGroup, u.index, s.commands);
              return Si(t.root, u.segmentGroup, c, r, i);
            })(e.snapshot?._lastPathIndex);
      }
      function Ws(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Gs(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Si(e, t, n, r, i) {
        let o,
          s = {};
        r &&
          je(r, (l, u) => {
            s[u] = Array.isArray(l) ? l.map((c) => `${c}`) : `${l}`;
          }),
          (o = e === t ? n : lE(e, t, n));
        const a = Tf(vl(o));
        return new Sr(a, s, i);
      }
      function lE(e, t, n) {
        const r = {};
        return (
          je(e.children, (i, s) => {
            r[s] = i === t ? n : lE(i, t, n);
          }),
          new q(e.segments, r)
        );
      }
      class uE {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Ws(r[0]))
          )
            throw new D(4003, !1);
          const i = r.find(Gs);
          if (i && i !== XD(r)) throw new D(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Ti {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function Mf(e, t, n) {
        if (
          (e || (e = new q([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return qs(e, t, n);
        const r = (function G1(e, t, n) {
            let r = 0,
              i = t;
            const s = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; i < e.segments.length; ) {
              if (r >= n.length) return s;
              const o = e.segments[i],
                a = n[r];
              if (Gs(a)) break;
              const l = `${a}`,
                u = r < n.length - 1 ? n[r + 1] : null;
              if (i > 0 && void 0 === l) break;
              if (l && u && "object" == typeof u && void 0 === u.outlets) {
                if (!hE(l, u, o)) return s;
                r += 2;
              } else {
                if (!hE(l, {}, o)) return s;
                r++;
              }
              i++;
            }
            return { match: !0, pathIndex: i, commandIndex: r };
          })(e, t, n),
          i = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const s = new q(e.segments.slice(0, r.pathIndex), {});
          return (
            (s.children[G] = new q(e.segments.slice(r.pathIndex), e.children)),
            qs(s, 0, i)
          );
        }
        return r.match && 0 === i.length
          ? new q(e.segments, {})
          : r.match && !e.hasChildren()
          ? Af(e, t, n)
          : r.match
          ? qs(e, 0, i)
          : Af(e, t, n);
      }
      function qs(e, t, n) {
        if (0 === n.length) return new q(e.segments, {});
        {
          const r = (function W1(e) {
              return Gs(e[0]) ? e[0].outlets : { [G]: e };
            })(n),
            i = {};
          return (
            je(r, (s, o) => {
              "string" == typeof s && (s = [s]),
                null !== s && (i[o] = Mf(e.children[o], t, s));
            }),
            je(e.children, (s, o) => {
              void 0 === r[o] && (i[o] = s);
            }),
            new q(e.segments, i)
          );
        }
      }
      function Af(e, t, n) {
        const r = e.segments.slice(0, t);
        let i = 0;
        for (; i < n.length; ) {
          const s = n[i];
          if (Gs(s)) {
            const l = q1(s.outlets);
            return new q(r, l);
          }
          if (0 === i && Ws(n[0])) {
            r.push(new Hs(e.segments[t].path, fE(n[0]))), i++;
            continue;
          }
          const o = Gs(s) ? s.outlets[G] : `${s}`,
            a = i < n.length - 1 ? n[i + 1] : null;
          o && a && Ws(a)
            ? (r.push(new Hs(o, fE(a))), (i += 2))
            : (r.push(new Hs(o, {})), i++);
        }
        return new q(r, {});
      }
      function q1(e) {
        const t = {};
        return (
          je(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = Af(new q([], {}), 0, n));
          }),
          t
        );
      }
      function fE(e) {
        const t = {};
        return je(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function hE(e, t, n) {
        return e == n.path && pn(t, n.parameters);
      }
      class xn {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Rf extends xn {
        constructor(t, n, r = "imperative", i = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = i);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Mr extends xn {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class _l extends xn {
        constructor(t, n, r, i) {
          super(t, n), (this.reason = r), (this.code = i), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class pE extends xn {
        constructor(t, n, r, i) {
          super(t, n), (this.error = r), (this.target = i), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class K1 extends xn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Q1 extends xn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Y1 extends xn {
        constructor(t, n, r, i, s) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.shouldActivate = s),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class Z1 extends xn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class X1 extends xn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class J1 {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class eF {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class tF {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class nF {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class rF {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class iF {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class gE {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class mE {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Nf(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Nf(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = xf(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((i) => i.value)
                .filter((i) => i !== t);
        }
        pathFromRoot(t) {
          return xf(t, this._root).map((n) => n.value);
        }
      }
      function Nf(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Nf(e, n);
          if (r) return r;
        }
        return null;
      }
      function xf(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = xf(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class Pn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Ii(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class yE extends mE {
        constructor(t, n) {
          super(t), (this.snapshot = n), Pf(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function vE(e, t) {
        const n = (function oF(e, t) {
            const o = new Dl([], {}, {}, "", {}, G, t, null, e.root, -1, {});
            return new DE("", new Pn(o, []));
          })(e, t),
          r = new Vt([new Hs("", {})]),
          i = new Vt({}),
          s = new Vt({}),
          o = new Vt({}),
          a = new Vt(""),
          l = new Ar(r, i, o, a, s, G, t, n.root);
        return (l.snapshot = n.root), new yE(new Pn(l, []), n);
      }
      class Ar {
        constructor(t, n, r, i, s, o, a, l) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = s),
            (this.outlet = o),
            (this.component = a),
            (this.title = this.data?.pipe(J((u) => u[Us])) ?? A(void 0)),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(J((t) => bi(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(J((t) => bi(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function _E(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const i = n[r],
              s = n[r - 1];
            if (i.routeConfig && "" === i.routeConfig.path) r--;
            else {
              if (s.component) break;
              r--;
            }
          }
        return (function aF(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Dl {
        constructor(t, n, r, i, s, o, a, l, u, c, d, f) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = s),
            (this.outlet = o),
            (this.component = a),
            (this.title = this.data?.[Us]),
            (this.routeConfig = l),
            (this._urlSegment = u),
            (this._lastPathIndex = c),
            (this._correctedLastPathIndex = f ?? c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = bi(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = bi(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class DE extends mE {
        constructor(t, n) {
          super(n), (this.url = t), Pf(this, n);
        }
        toString() {
          return EE(this._root);
        }
      }
      function Pf(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => Pf(e, n));
      }
      function EE(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(EE).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Of(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            pn(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            pn(t.params, n.params) || e.params.next(n.params),
            (function w1(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!pn(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            pn(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Ff(e, t) {
        const n =
          pn(e.params, t.params) &&
          (function I1(e, t) {
            return (
              Tr(e, t) && e.every((n, r) => pn(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Ff(e.parent, t.parent))
        );
      }
      function Ks(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const i = (function uF(e, t, n) {
            return t.children.map((r) => {
              for (const i of n.children)
                if (e.shouldReuseRoute(r.value, i.value.snapshot))
                  return Ks(e, r, i);
              return Ks(e, r);
            });
          })(e, t, n);
          return new Pn(r, i);
        }
        {
          if (e.shouldAttach(t.value)) {
            const s = e.retrieve(t.value);
            if (null !== s) {
              const o = s.route;
              return (
                (o.value._futureSnapshot = t.value),
                (o.children = t.children.map((a) => Ks(e, a))),
                o
              );
            }
          }
          const r = (function cF(e) {
              return new Ar(
                new Vt(e.url),
                new Vt(e.params),
                new Vt(e.queryParams),
                new Vt(e.fragment),
                new Vt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            i = t.children.map((s) => Ks(e, s));
          return new Pn(r, i);
        }
      }
      const Lf = "ngNavigationCancelingError";
      function wE(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = Ir(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          i = CE(!1, 0, t);
        return (i.url = n), (i.navigationBehaviorOptions = r), i;
      }
      function CE(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Lf] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function bE(e) {
        return SE(e) && Ir(e.url);
      }
      function SE(e) {
        return e && e[Lf];
      }
      class dF {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new Qs()),
            (this.attachRef = null);
        }
      }
      let Qs = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const i = this.getOrCreateContext(n);
            (i.outlet = r), this.contexts.set(n, i);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new dF()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const El = !1;
      let TE = (() => {
        class e {
          constructor(n, r, i, s, o) {
            (this.parentContexts = n),
              (this.location = r),
              (this.changeDetector = s),
              (this.environmentInjector = o),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new st()),
              (this.deactivateEvents = new st()),
              (this.attachEvents = new st()),
              (this.detachEvents = new st()),
              (this.name = i || G),
              n.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.getContext(this.name)?.outlet === this &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const n = this.parentContexts.getContext(this.name);
              n &&
                n.route &&
                (n.attachRef
                  ? this.attach(n.attachRef, n.route)
                  : this.activateWith(n.route, n.injector));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new D(4012, El);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new D(4012, El);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new D(4012, El);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new D(4013, El);
            this._activatedRoute = n;
            const i = this.location,
              o = n._futureSnapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new fF(n, a, i.injector);
            if (
              r &&
              (function hF(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const u = r.resolveComponentFactory(o);
              this.activated = i.createComponent(u, i.length, l);
            } else
              this.activated = i.createComponent(o, {
                index: i.length,
                injector: l,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(
              T(Qs),
              T(Xt),
              (function Gi(e) {
                return (function $C(e, t) {
                  if ("class" === t) return e.classes;
                  if ("style" === t) return e.styles;
                  const n = e.attrs;
                  if (n) {
                    const r = n.length;
                    let i = 0;
                    for (; i < r; ) {
                      const s = n[i];
                      if (jh(s)) break;
                      if (0 === s) i += 2;
                      else if ("number" == typeof s)
                        for (i++; i < r && "string" == typeof n[i]; ) i++;
                      else {
                        if (s === t) return n[i + 1];
                        i += 2;
                      }
                    }
                  }
                  return null;
                })(Ne(), e);
              })("name"),
              T(Sa),
              T($n)
            );
          }),
          (e.ɵdir = Be({
            type: e,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
          })),
          e
        );
      })();
      class fF {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Ar
            ? this.route
            : t === Qs
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let kf = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = ze({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [jy],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && he(0, "router-outlet");
            },
            dependencies: [TE],
            encapsulation: 2,
          })),
          e
        );
      })();
      function IE(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = ma(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function Bf(e) {
        const t = e.children && e.children.map(Bf),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== G &&
            (n.component = kf),
          n
        );
      }
      function Bt(e) {
        return e.outlet || G;
      }
      function ME(e, t) {
        const n = e.filter((r) => Bt(r) === t);
        return n.push(...e.filter((r) => Bt(r) !== t)), n;
      }
      function Ys(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class vF {
        constructor(t, n, r, i) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = i);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Of(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const i = Ii(n);
          t.children.forEach((s) => {
            const o = s.value.outlet;
            this.deactivateRoutes(s, i[o], r), delete i[o];
          }),
            je(i, (s, o) => {
              this.deactivateRouteAndItsChildren(s, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const i = t.value,
            s = n ? n.value : null;
          if (i === s)
            if (i.component) {
              const o = r.getContext(i.outlet);
              o && this.deactivateChildRoutes(t, n, o.children);
            } else this.deactivateChildRoutes(t, n, r);
          else s && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            s = Ii(t);
          for (const o of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[o], i);
          if (r && r.outlet) {
            const o = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: o,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            s = Ii(t);
          for (const o of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[o], i);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const i = Ii(n);
          t.children.forEach((s) => {
            this.activateRoutes(s, i[s.value.outlet], r),
              this.forwardEvent(new iF(s.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new nF(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const i = t.value,
            s = n ? n.value : null;
          if ((Of(i), i === s))
            if (i.component) {
              const o = r.getOrCreateContext(i.outlet);
              this.activateChildRoutes(t, n, o.children);
            } else this.activateChildRoutes(t, n, r);
          else if (i.component) {
            const o = r.getOrCreateContext(i.outlet);
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(i.snapshot);
              this.routeReuseStrategy.store(i.snapshot, null),
                o.children.onOutletReAttached(a.contexts),
                (o.attachRef = a.componentRef),
                (o.route = a.route.value),
                o.outlet && o.outlet.attach(a.componentRef, a.route.value),
                Of(a.route.value),
                this.activateChildRoutes(t, null, o.children);
            } else {
              const a = Ys(i.snapshot),
                l = a?.get(us) ?? null;
              (o.attachRef = null),
                (o.route = i),
                (o.resolver = l),
                (o.injector = a),
                o.outlet && o.outlet.activateWith(i, o.injector),
                this.activateChildRoutes(t, null, o.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class AE {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class wl {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function _F(e, t, n) {
        const r = e._root;
        return Zs(r, t ? t._root : null, n, [r.value]);
      }
      function Mi(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function Uw(e) {
              return null !== po(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function Zs(
        e,
        t,
        n,
        r,
        i = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const s = Ii(t);
        return (
          e.children.forEach((o) => {
            (function EF(
              e,
              t,
              n,
              r,
              i = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const s = e.value,
                o = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (o && s.routeConfig === o.routeConfig) {
                const l = (function wF(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !Tr(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Tr(e.url, t.url) || !pn(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Ff(e, t) || !pn(e.queryParams, t.queryParams);
                    default:
                      return !Ff(e, t);
                  }
                })(o, s, s.routeConfig.runGuardsAndResolvers);
                l
                  ? i.canActivateChecks.push(new AE(r))
                  : ((s.data = o.data), (s._resolvedData = o._resolvedData)),
                  Zs(e, t, s.component ? (a ? a.children : null) : n, r, i),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    i.canDeactivateChecks.push(new wl(a.outlet.component, o));
              } else
                o && Xs(t, a, i),
                  i.canActivateChecks.push(new AE(r)),
                  Zs(e, null, s.component ? (a ? a.children : null) : n, r, i);
            })(o, s[o.value.outlet], n, r.concat([o.value]), i),
              delete s[o.value.outlet];
          }),
          je(s, (o, a) => Xs(o, n.getContext(a), i)),
          i
        );
      }
      function Xs(e, t, n) {
        const r = Ii(e),
          i = e.value;
        je(r, (s, o) => {
          Xs(s, i.component ? (t ? t.children.getContext(o) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new wl(
              i.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              i
            )
          );
      }
      function Js(e) {
        return "function" == typeof e;
      }
      function jf(e) {
        return e instanceof dl || "EmptyError" === e?.name;
      }
      const Cl = Symbol("INITIAL_VALUE");
      function Ai() {
        return nn((e) =>
          zD(
            e.map((t) =>
              t.pipe(
                $s(1),
                (function QO(...e) {
                  const t = e[e.length - 1];
                  return so(t)
                    ? (e.pop(), (n) => _f(e, n, t))
                    : (n) => _f(e, n);
                })(Cl)
              )
            )
          ).pipe(
            J((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === Cl) return Cl;
                  if (!1 === n || n instanceof Sr) return n;
                }
              return !0;
            }),
            Nn((t) => t !== Cl),
            $s(1)
          )
        );
      }
      function RE(e) {
        return (function cw(...e) {
          return oh(e);
        })(
          Qe((t) => {
            if (Ir(t)) throw wE(0, t);
          }),
          J((t) => !0 === t)
        );
      }
      const $f = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function NE(e, t, n, r, i) {
        const s = Uf(e, t, n);
        return s.matched
          ? (function BF(e, t, n, r) {
              const i = t.canMatch;
              return i && 0 !== i.length
                ? A(
                    i.map((o) => {
                      const a = Mi(o, e);
                      return er(
                        (function MF(e) {
                          return e && Js(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(Ai(), RE())
                : A(!0);
            })((r = IE(t, r)), t, n).pipe(J((o) => (!0 === o ? s : { ...$f })))
          : A(s);
      }
      function Uf(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...$f }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const i = (t.matcher || E1)(n, e, t);
        if (!i) return { ...$f };
        const s = {};
        je(i.posParams, (a, l) => {
          s[l] = a.path;
        });
        const o =
          i.consumed.length > 0
            ? { ...s, ...i.consumed[i.consumed.length - 1].parameters }
            : s;
        return {
          matched: !0,
          consumedSegments: i.consumed,
          remainingSegments: n.slice(i.consumed.length),
          parameters: o,
          positionalParamSegments: i.posParams ?? {},
        };
      }
      function bl(e, t, n, r, i = "corrected") {
        if (
          n.length > 0 &&
          (function UF(e, t, n) {
            return n.some((r) => Sl(e, t, r) && Bt(r) !== G);
          })(e, n, r)
        ) {
          const o = new q(
            t,
            (function $F(e, t, n, r) {
              const i = {};
              (i[G] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const s of n)
                if ("" === s.path && Bt(s) !== G) {
                  const o = new q([], {});
                  (o._sourceSegment = e),
                    (o._segmentIndexShift = t.length),
                    (i[Bt(s)] = o);
                }
              return i;
            })(e, t, r, new q(n, e.children))
          );
          return (
            (o._sourceSegment = e),
            (o._segmentIndexShift = t.length),
            { segmentGroup: o, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function HF(e, t, n) {
            return n.some((r) => Sl(e, t, r));
          })(e, n, r)
        ) {
          const o = new q(
            e.segments,
            (function jF(e, t, n, r, i, s) {
              const o = {};
              for (const a of r)
                if (Sl(e, n, a) && !i[Bt(a)]) {
                  const l = new q([], {});
                  (l._sourceSegment = e),
                    (l._segmentIndexShift =
                      "legacy" === s ? e.segments.length : t.length),
                    (o[Bt(a)] = l);
                }
              return { ...i, ...o };
            })(e, t, n, r, e.children, i)
          );
          return (
            (o._sourceSegment = e),
            (o._segmentIndexShift = t.length),
            { segmentGroup: o, slicedSegments: n }
          );
        }
        const s = new q(e.segments, e.children);
        return (
          (s._sourceSegment = e),
          (s._segmentIndexShift = t.length),
          { segmentGroup: s, slicedSegments: n }
        );
      }
      function Sl(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function xE(e, t, n, r) {
        return (
          !!(Bt(e) === r || (r !== G && Sl(t, n, e))) &&
          ("**" === e.path || Uf(t, e, n).matched)
        );
      }
      function PE(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const Tl = !1;
      class Il {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class OE {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function eo(e) {
        return js(new Il(e));
      }
      function FE(e) {
        return js(new OE(e));
      }
      class qF {
        constructor(t, n, r, i, s) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = i),
            (this.config = s),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = bl(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new q(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, G)
            .pipe(
              J((s) =>
                this.createUrlTree(
                  vl(s),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              br((s) => {
                if (s instanceof OE)
                  return (this.allowRedirects = !1), this.match(s.urlTree);
                throw s instanceof Il ? this.noMatchError(s) : s;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, G)
            .pipe(
              J((i) => this.createUrlTree(vl(i), t.queryParams, t.fragment))
            )
            .pipe(
              br((i) => {
                throw i instanceof Il ? this.noMatchError(i) : i;
              })
            );
        }
        noMatchError(t) {
          return new D(4002, Tl);
        }
        createUrlTree(t, n, r) {
          const i = Tf(t);
          return new Sr(i, n, r);
        }
        expandSegmentGroup(t, n, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(J((s) => new q([], s)))
            : this.expandSegment(t, r, n, r.segments, i, !0);
        }
        expandChildren(t, n, r) {
          const i = [];
          for (const s of Object.keys(r.children))
            "primary" === s ? i.unshift(s) : i.push(s);
          return Ve(i).pipe(
            Cr((s) => {
              const o = r.children[s],
                a = ME(n, s);
              return this.expandSegmentGroup(t, a, o, s).pipe(
                J((l) => ({ segment: l, outlet: s }))
              );
            }),
            KD((s, o) => ((s[o.outlet] = o.segment), s), {}),
            QD()
          );
        }
        expandSegment(t, n, r, i, s, o) {
          return Ve(r).pipe(
            Cr((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, i, s, o).pipe(
                br((u) => {
                  if (u instanceof Il) return A(null);
                  throw u;
                })
              )
            ),
            Xn((a) => !!a),
            br((a, l) => {
              if (jf(a)) return PE(n, i, s) ? A(new q([], {})) : eo(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, i, s, o, a) {
          return xE(i, n, s, o)
            ? void 0 === i.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, i, s, o)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, i, s, o)
              : eo(n)
            : eo(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, i, s, o) {
          return "**" === i.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, i, o)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                i,
                s,
                o
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i) {
          const s = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? FE(s)
            : this.lineralizeSegments(r, s).pipe(
                Ue((o) => {
                  const a = new q(o, {});
                  return this.expandSegment(t, a, n, o, i, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, i, s, o) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: u,
            positionalParamSegments: c,
          } = Uf(n, i, s);
          if (!a) return eo(n);
          const d = this.applyRedirectCommands(l, i.redirectTo, c);
          return i.redirectTo.startsWith("/")
            ? FE(d)
            : this.lineralizeSegments(i, d).pipe(
                Ue((f) => this.expandSegment(t, n, r, f.concat(u), o, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, i, s) {
          return "**" === r.path
            ? ((t = IE(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? A({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    J(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new q(i, {})
                      )
                    )
                  )
                : A(new q(i, {})))
            : NE(n, r, i, t).pipe(
                nn(
                  ({ matched: o, consumedSegments: a, remainingSegments: l }) =>
                    o
                      ? this.getChildConfig((t = r._injector ?? t), r, i).pipe(
                          Ue((c) => {
                            const d = c.injector ?? t,
                              f = c.routes,
                              { segmentGroup: h, slicedSegments: p } = bl(
                                n,
                                a,
                                l,
                                f
                              ),
                              g = new q(h.segments, h.children);
                            if (0 === p.length && g.hasChildren())
                              return this.expandChildren(d, f, g).pipe(
                                J((y) => new q(a, y))
                              );
                            if (0 === f.length && 0 === p.length)
                              return A(new q(a, {}));
                            const m = Bt(r) === s;
                            return this.expandSegment(
                              d,
                              g,
                              f,
                              p,
                              m ? G : s,
                              !0
                            ).pipe(
                              J((E) => new q(a.concat(E.segments), E.children))
                            );
                          })
                        )
                      : eo(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? A({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? A({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function VF(e, t, n, r) {
                  const i = t.canLoad;
                  return void 0 === i || 0 === i.length
                    ? A(!0)
                    : A(
                        i.map((o) => {
                          const a = Mi(o, e);
                          return er(
                            (function bF(e) {
                              return e && Js(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(Ai(), RE());
                })(t, n, r).pipe(
                  Ue((i) =>
                    i
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Qe((s) => {
                            (n._loadedRoutes = s.routes),
                              (n._loadedInjector = s.injector);
                          })
                        )
                      : (function WF(e) {
                          return js(CE(Tl, 3));
                        })()
                  )
                )
            : A({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            i = n.root;
          for (;;) {
            if (((r = r.concat(i.segments)), 0 === i.numberOfChildren))
              return A(r);
            if (i.numberOfChildren > 1 || !i.children[G])
              return js(new D(4e3, Tl));
            i = i.children[G];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, i) {
          const s = this.createSegmentGroup(t, n.root, r, i);
          return new Sr(
            s,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            je(t, (i, s) => {
              if ("string" == typeof i && i.startsWith(":")) {
                const a = i.substring(1);
                r[s] = n[a];
              } else r[s] = i;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, i) {
          const s = this.createSegments(t, n.segments, r, i);
          let o = {};
          return (
            je(n.children, (a, l) => {
              o[l] = this.createSegmentGroup(t, a, r, i);
            }),
            new q(s, o)
          );
        }
        createSegments(t, n, r, i) {
          return n.map((s) =>
            s.path.startsWith(":")
              ? this.findPosParam(t, s, i)
              : this.findOrReturn(s, r)
          );
        }
        findPosParam(t, n, r) {
          const i = r[n.path.substring(1)];
          if (!i) throw new D(4001, Tl);
          return i;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const i of n) {
            if (i.path === t.path) return n.splice(r), i;
            r++;
          }
          return t;
        }
      }
      class QF {}
      class XF {
        constructor(t, n, r, i, s, o, a, l) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = i),
            (this.url = s),
            (this.paramsInheritanceStrategy = o),
            (this.relativeLinkResolution = a),
            (this.urlSerializer = l);
        }
        recognize() {
          const t = bl(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo),
            this.relativeLinkResolution
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            G
          ).pipe(
            J((n) => {
              if (null === n) return null;
              const r = new Dl(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  G,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                i = new Pn(r, n),
                s = new DE(this.url, i);
              return this.inheritParamsAndData(s._root), s;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = _E(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((i) => this.inheritParamsAndData(i));
        }
        processSegmentGroup(t, n, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, i);
        }
        processChildren(t, n, r) {
          return Ve(Object.keys(r.children)).pipe(
            Cr((i) => {
              const s = r.children[i],
                o = ME(n, i);
              return this.processSegmentGroup(t, o, s, i);
            }),
            KD((i, s) => (i && s ? (i.push(...s), i) : null)),
            (function f1(e, t = !1) {
              return (n) => n.lift(new h1(e, t));
            })((i) => null !== i),
            fl(null),
            QD(),
            J((i) => {
              if (null === i) return null;
              const s = LE(i);
              return (
                (function JF(e) {
                  e.sort((t, n) =>
                    t.value.outlet === G
                      ? -1
                      : n.value.outlet === G
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(s),
                s
              );
            })
          );
        }
        processSegment(t, n, r, i, s) {
          return Ve(n).pipe(
            Cr((o) =>
              this.processSegmentAgainstRoute(o._injector ?? t, o, r, i, s)
            ),
            Xn((o) => !!o),
            br((o) => {
              if (jf(o)) return PE(r, i, s) ? A([]) : A(null);
              throw o;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, i, s) {
          if (n.redirectTo || !xE(n, r, i, s)) return A(null);
          let o;
          if ("**" === n.path) {
            const a = i.length > 0 ? XD(i).parameters : {},
              l = VE(r) + i.length;
            o = A({
              snapshot: new Dl(
                i,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                jE(n),
                Bt(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                kE(r),
                l,
                $E(n),
                l
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            o = NE(r, n, i, t).pipe(
              J(
                ({
                  matched: a,
                  consumedSegments: l,
                  remainingSegments: u,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = VE(r) + l.length;
                  return {
                    snapshot: new Dl(
                      l,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      jE(n),
                      Bt(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      kE(r),
                      d,
                      $E(n),
                      d
                    ),
                    consumedSegments: l,
                    remainingSegments: u,
                  };
                }
              )
            );
          return o.pipe(
            nn((a) => {
              if (null === a) return A(null);
              const {
                snapshot: l,
                consumedSegments: u,
                remainingSegments: c,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function eL(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: h, slicedSegments: p } = bl(
                  r,
                  u,
                  c,
                  f.filter((m) => void 0 === m.redirectTo),
                  this.relativeLinkResolution
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  J((m) => (null === m ? null : [new Pn(l, m)]))
                );
              if (0 === f.length && 0 === p.length) return A([new Pn(l, [])]);
              const g = Bt(n) === s;
              return this.processSegment(d, f, h, p, g ? G : s).pipe(
                J((m) => (null === m ? null : [new Pn(l, m)]))
              );
            })
          );
        }
      }
      function tL(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function LE(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!tL(r)) {
            t.push(r);
            continue;
          }
          const i = t.find((s) => r.value.routeConfig === s.value.routeConfig);
          void 0 !== i ? (i.children.push(...r.children), n.add(i)) : t.push(r);
        }
        for (const r of n) {
          const i = LE(r.children);
          t.push(new Pn(r.value, i));
        }
        return t.filter((r) => !n.has(r));
      }
      function kE(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function VE(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function jE(e) {
        return e.data || {};
      }
      function $E(e) {
        return e.resolve || {};
      }
      function UE(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Hf(e) {
        return nn((t) => {
          const n = e(t);
          return n ? Ve(n).pipe(J(() => t)) : A(t);
        });
      }
      let HE = (() => {
          class e {
            buildTitle(n) {
              let r,
                i = n.root;
              for (; void 0 !== i; )
                (r = this.getResolvedTitleForRoute(i) ?? r),
                  (i = i.children.find((s) => s.outlet === G));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[Us];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = V({
              token: e,
              factory: function () {
                return be(zE);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        zE = (() => {
          class e extends HE {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(Q_));
            }),
            (e.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      class uL {}
      class dL extends class cL {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      } {}
      const Al = new k("", { providedIn: "root", factory: () => ({}) }),
        zf = new k("ROUTES");
      let Wf = (() => {
        class e {
          constructor(n, r) {
            (this.injector = n),
              (this.compiler = r),
              (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap());
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return A(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = er(n.loadComponent()).pipe(
                Qe((s) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = s);
                }),
                wf(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              i = new Bl(r, () => new $t()).pipe(co());
            return this.componentLoaders.set(n, i), i;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return A({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const s = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                J((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let l,
                    u,
                    c = !1;
                  Array.isArray(a)
                    ? (u = a)
                    : ((l = a.create(n).injector),
                      (u = ZD(l.get(zf, [], x.Self | x.Optional))));
                  return { routes: u.map(Bf), injector: l };
                }),
                wf(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              o = new Bl(s, () => new $t()).pipe(co());
            return this.childrenLoaders.set(r, o), o;
          }
          loadModuleFactoryOrRoutes(n) {
            return er(n()).pipe(
              Ue((r) =>
                r instanceof Vy || Array.isArray(r)
                  ? A(r)
                  : Ve(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(Nt), I(od));
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class hL {}
      class pL {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, n) {
          return t;
        }
      }
      function gL(e) {
        throw e;
      }
      function mL(e, t, n) {
        return t.parse("/");
      }
      const yL = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        vL = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      function GE() {
        const e = be(iE),
          t = be(Qs),
          n = be(Ed),
          r = be(Nt),
          i = be(od),
          s = be(zf, { optional: !0 }) ?? [],
          o = be(Al, { optional: !0 }) ?? {},
          a = be(zE),
          l = be(HE, { optional: !0 }),
          u = be(hL, { optional: !0 }),
          c = be(uL, { optional: !0 }),
          d = new $e(null, e, t, n, r, i, ZD(s));
        return (
          u && (d.urlHandlingStrategy = u),
          c && (d.routeReuseStrategy = c),
          (d.titleStrategy = l ?? a),
          (function _L(e, t) {
            e.errorHandler && (t.errorHandler = e.errorHandler),
              e.malformedUriErrorHandler &&
                (t.malformedUriErrorHandler = e.malformedUriErrorHandler),
              e.onSameUrlNavigation &&
                (t.onSameUrlNavigation = e.onSameUrlNavigation),
              e.paramsInheritanceStrategy &&
                (t.paramsInheritanceStrategy = e.paramsInheritanceStrategy),
              e.relativeLinkResolution &&
                (t.relativeLinkResolution = e.relativeLinkResolution),
              e.urlUpdateStrategy &&
                (t.urlUpdateStrategy = e.urlUpdateStrategy),
              e.canceledNavigationResolution &&
                (t.canceledNavigationResolution =
                  e.canceledNavigationResolution);
          })(o, d),
          d
        );
      }
      let $e = (() => {
        class e {
          constructor(n, r, i, s, o, a, l) {
            (this.rootComponentType = n),
              (this.urlSerializer = r),
              (this.rootContexts = i),
              (this.location = s),
              (this.config = l),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new $t()),
              (this.errorHandler = gL),
              (this.malformedUriErrorHandler = mL),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.afterPreactivation = () => A(void 0)),
              (this.urlHandlingStrategy = new pL()),
              (this.routeReuseStrategy = new dL()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.configLoader = o.get(Wf)),
              (this.configLoader.onLoadEndListener = (f) =>
                this.triggerEvent(new eF(f))),
              (this.configLoader.onLoadStartListener = (f) =>
                this.triggerEvent(new J1(f))),
              (this.ngModule = o.get(mr)),
              (this.console = o.get(CA));
            const d = o.get(Se);
            (this.isNgZoneEnabled = d instanceof Se && Se.isInAngularZone()),
              this.resetConfig(l),
              (this.currentUrlTree = (function C1() {
                return new Sr(new q([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = vE(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new Vt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            return this.location.getState()?.ɵrouterPageId;
          }
          setupNavigations(n) {
            const r = this.events;
            return n.pipe(
              Nn((i) => 0 !== i.id),
              J((i) => ({
                ...i,
                extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl),
              })),
              nn((i) => {
                let s = !1,
                  o = !1;
                return A(i).pipe(
                  Qe((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.rawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? {
                            ...this.lastSuccessfulNavigation,
                            previousNavigation: null,
                          }
                        : null,
                    };
                  }),
                  nn((a) => {
                    const l = this.browserUrlTree.toString(),
                      u =
                        !this.navigated ||
                        a.extractedUrl.toString() !== l ||
                        l !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || u) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        qE(a.source) && (this.browserUrlTree = a.extractedUrl),
                        A(a).pipe(
                          nn((d) => {
                            const f = this.transitions.getValue();
                            return (
                              r.next(
                                new Rf(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? Ci
                                : Promise.resolve(d)
                            );
                          }),
                          (function KF(e, t, n, r) {
                            return nn((i) =>
                              (function GF(e, t, n, r, i) {
                                return new qF(e, t, n, r, i).apply();
                              })(e, t, n, i.extractedUrl, r).pipe(
                                J((s) => ({ ...i, urlAfterRedirects: s }))
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          Qe((d) => {
                            (this.currentNavigation = {
                              ...this.currentNavigation,
                              finalUrl: d.urlAfterRedirects,
                            }),
                              (i.urlAfterRedirects = d.urlAfterRedirects);
                          }),
                          (function rL(e, t, n, r, i, s) {
                            return Ue((o) =>
                              (function ZF(
                                e,
                                t,
                                n,
                                r,
                                i,
                                s,
                                o = "emptyOnly",
                                a = "legacy"
                              ) {
                                return new XF(e, t, n, r, i, o, a, s)
                                  .recognize()
                                  .pipe(
                                    nn((l) =>
                                      null === l
                                        ? (function YF(e) {
                                            return new Ce((t) => t.error(e));
                                          })(new QF())
                                        : A(l)
                                    )
                                  );
                              })(
                                e,
                                t,
                                n,
                                o.urlAfterRedirects,
                                r.serialize(o.urlAfterRedirects),
                                r,
                                i,
                                s
                              ).pipe(J((a) => ({ ...o, targetSnapshot: a })))
                            );
                          })(
                            this.ngModule.injector,
                            this.rootComponentType,
                            this.config,
                            this.urlSerializer,
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          Qe((d) => {
                            if (
                              ((i.targetSnapshot = d.targetSnapshot),
                              "eager" === this.urlUpdateStrategy)
                            ) {
                              if (!d.extras.skipLocationChange) {
                                const h = this.urlHandlingStrategy.merge(
                                  d.urlAfterRedirects,
                                  d.rawUrl
                                );
                                this.setBrowserUrl(h, d);
                              }
                              this.browserUrlTree = d.urlAfterRedirects;
                            }
                            const f = new K1(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            r.next(f);
                          })
                        )
                      );
                    if (
                      u &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: f,
                          extractedUrl: h,
                          source: p,
                          restoredState: g,
                          extras: m,
                        } = a,
                        _ = new Rf(f, this.serializeUrl(h), p, g);
                      r.next(_);
                      const E = vE(h, this.rootComponentType).snapshot;
                      return A(
                        (i = {
                          ...a,
                          targetSnapshot: E,
                          urlAfterRedirects: h,
                          extras: {
                            ...m,
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          },
                        })
                      );
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), Ci;
                  }),
                  Qe((a) => {
                    const l = new Q1(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(l);
                  }),
                  J(
                    (a) =>
                      (i = {
                        ...a,
                        guards: _F(
                          a.targetSnapshot,
                          a.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                  ),
                  (function RF(e, t) {
                    return Ue((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: i,
                        guards: {
                          canActivateChecks: s,
                          canDeactivateChecks: o,
                        },
                      } = n;
                      return 0 === o.length && 0 === s.length
                        ? A({ ...n, guardsResult: !0 })
                        : (function NF(e, t, n, r) {
                            return Ve(e).pipe(
                              Ue((i) =>
                                (function kF(e, t, n, r, i) {
                                  const s =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null;
                                  return s && 0 !== s.length
                                    ? A(
                                        s.map((a) => {
                                          const l = Ys(t) ?? i,
                                            u = Mi(a, l);
                                          return er(
                                            (function IF(e) {
                                              return e && Js(e.canDeactivate);
                                            })(u)
                                              ? u.canDeactivate(e, t, n, r)
                                              : l.runInContext(() =>
                                                  u(e, t, n, r)
                                                )
                                          ).pipe(Xn());
                                        })
                                      ).pipe(Ai())
                                    : A(!0);
                                })(i.component, i.route, n, t, r)
                              ),
                              Xn((i) => !0 !== i, !0)
                            );
                          })(o, r, i, e).pipe(
                            Ue((a) =>
                              a &&
                              (function CF(e) {
                                return "boolean" == typeof e;
                              })(a)
                                ? (function xF(e, t, n, r) {
                                    return Ve(t).pipe(
                                      Cr((i) =>
                                        _f(
                                          (function OF(e, t) {
                                            return (
                                              null !== e && t && t(new tF(e)),
                                              A(!0)
                                            );
                                          })(i.route.parent, r),
                                          (function PF(e, t) {
                                            return (
                                              null !== e && t && t(new rF(e)),
                                              A(!0)
                                            );
                                          })(i.route, r),
                                          (function LF(e, t, n) {
                                            const r = t[t.length - 1],
                                              s = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((o) =>
                                                  (function DF(e) {
                                                    const t = e.routeConfig
                                                      ? e.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return t && 0 !== t.length
                                                      ? { node: e, guards: t }
                                                      : null;
                                                  })(o)
                                                )
                                                .filter((o) => null !== o)
                                                .map((o) =>
                                                  WD(() =>
                                                    A(
                                                      o.guards.map((l) => {
                                                        const u =
                                                            Ys(o.node) ?? n,
                                                          c = Mi(l, u);
                                                        return er(
                                                          (function TF(e) {
                                                            return (
                                                              e &&
                                                              Js(
                                                                e.canActivateChild
                                                              )
                                                            );
                                                          })(c)
                                                            ? c.canActivateChild(
                                                                r,
                                                                e
                                                              )
                                                            : u.runInContext(
                                                                () => c(r, e)
                                                              )
                                                        ).pipe(Xn());
                                                      })
                                                    ).pipe(Ai())
                                                  )
                                                );
                                            return A(s).pipe(Ai());
                                          })(e, i.path, n),
                                          (function FF(e, t, n) {
                                            const r = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return A(!0);
                                            const i = r.map((s) =>
                                              WD(() => {
                                                const o = Ys(t) ?? n,
                                                  a = Mi(s, o);
                                                return er(
                                                  (function SF(e) {
                                                    return (
                                                      e && Js(e.canActivate)
                                                    );
                                                  })(a)
                                                    ? a.canActivate(t, e)
                                                    : o.runInContext(() =>
                                                        a(t, e)
                                                      )
                                                ).pipe(Xn());
                                              })
                                            );
                                            return A(i).pipe(Ai());
                                          })(e, i.route, n)
                                        )
                                      ),
                                      Xn((i) => !0 !== i, !0)
                                    );
                                  })(r, s, e, t)
                                : A(a)
                            ),
                            J((a) => ({ ...n, guardsResult: a }))
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  Qe((a) => {
                    if (((i.guardsResult = a.guardsResult), Ir(a.guardsResult)))
                      throw wE(0, a.guardsResult);
                    const l = new Y1(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(l);
                  }),
                  Nn(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, "", 3),
                      !1)
                  ),
                  Hf((a) => {
                    if (a.guards.canActivateChecks.length)
                      return A(a).pipe(
                        Qe((l) => {
                          const u = new Z1(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        }),
                        nn((l) => {
                          let u = !1;
                          return A(l).pipe(
                            (function iL(e, t) {
                              return Ue((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: i },
                                } = n;
                                if (!i.length) return A(n);
                                let s = 0;
                                return Ve(i).pipe(
                                  Cr((o) =>
                                    (function sL(e, t, n, r) {
                                      const i = e.routeConfig,
                                        s = e._resolve;
                                      return (
                                        void 0 !== i?.title &&
                                          !UE(i) &&
                                          (s[Us] = i.title),
                                        (function oL(e, t, n, r) {
                                          const i = (function aL(e) {
                                            return [
                                              ...Object.keys(e),
                                              ...Object.getOwnPropertySymbols(
                                                e
                                              ),
                                            ];
                                          })(e);
                                          if (0 === i.length) return A({});
                                          const s = {};
                                          return Ve(i).pipe(
                                            Ue((o) =>
                                              (function lL(e, t, n, r) {
                                                const i = Ys(t) ?? r,
                                                  s = Mi(e, i);
                                                return er(
                                                  s.resolve
                                                    ? s.resolve(t, n)
                                                    : i.runInContext(() =>
                                                        s(t, n)
                                                      )
                                                );
                                              })(e[o], t, n, r).pipe(
                                                Xn(),
                                                Qe((a) => {
                                                  s[o] = a;
                                                })
                                              )
                                            ),
                                            Ef(1),
                                            (function g1(e) {
                                              return (t) => t.lift(new m1(e));
                                            })(s),
                                            br((o) => (jf(o) ? Ci : js(o)))
                                          );
                                        })(s, e, t, r).pipe(
                                          J(
                                            (o) => (
                                              (e._resolvedData = o),
                                              (e.data = _E(e, n).resolve),
                                              i &&
                                                UE(i) &&
                                                (e.data[Us] = i.title),
                                              null
                                            )
                                          )
                                        )
                                      );
                                    })(o.route, r, e, t)
                                  ),
                                  Qe(() => s++),
                                  Ef(1),
                                  Ue((o) => (s === i.length ? A(n) : Ci))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            Qe({
                              next: () => (u = !0),
                              complete: () => {
                                u ||
                                  (this.restoreHistory(l),
                                  this.cancelNavigationTransition(l, "", 2));
                              },
                            })
                          );
                        }),
                        Qe((l) => {
                          const u = new X1(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        })
                      );
                  }),
                  Hf((a) => {
                    const l = (u) => {
                      const c = [];
                      u.routeConfig?.loadComponent &&
                        !u.routeConfig._loadedComponent &&
                        c.push(
                          this.configLoader.loadComponent(u.routeConfig).pipe(
                            Qe((d) => {
                              u.component = d;
                            }),
                            J(() => {})
                          )
                        );
                      for (const d of u.children) c.push(...l(d));
                      return c;
                    };
                    return zD(l(a.targetSnapshot.root)).pipe(fl(), $s(1));
                  }),
                  Hf(() => this.afterPreactivation()),
                  J((a) => {
                    const l = (function lF(e, t, n) {
                      const r = Ks(e, t._root, n ? n._root : void 0);
                      return new yE(r, t);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return (i = { ...a, targetRouterState: l });
                  }),
                  Qe((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((e, t, n) =>
                    J(
                      (r) => (
                        new vF(
                          t,
                          r.targetRouterState,
                          r.currentRouterState,
                          n
                        ).activate(e),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  Qe({
                    next() {
                      s = !0;
                    },
                    complete() {
                      s = !0;
                    },
                  }),
                  wf(() => {
                    s || o || this.cancelNavigationTransition(i, "", 1),
                      this.currentNavigation?.id === i.id &&
                        (this.currentNavigation = null);
                  }),
                  br((a) => {
                    if (((o = !0), SE(a))) {
                      bE(a) ||
                        ((this.navigated = !0), this.restoreHistory(i, !0));
                      const l = new _l(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a.message,
                        a.cancellationCode
                      );
                      if ((r.next(l), bE(a))) {
                        const u = this.urlHandlingStrategy.merge(
                            a.url,
                            this.rawUrlTree
                          ),
                          c = {
                            skipLocationChange: i.extras.skipLocationChange,
                            replaceUrl:
                              "eager" === this.urlUpdateStrategy ||
                              qE(i.source),
                          };
                        this.scheduleNavigation(u, "imperative", null, c, {
                          resolve: i.resolve,
                          reject: i.reject,
                          promise: i.promise,
                        });
                      } else i.resolve(!1);
                    } else {
                      this.restoreHistory(i, !0);
                      const l = new pE(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a,
                        i.targetSnapshot ?? void 0
                      );
                      r.next(l);
                      try {
                        i.resolve(this.errorHandler(a));
                      } catch (u) {
                        i.reject(u);
                      }
                    }
                    return Ci;
                  })
                );
              })
            );
          }
          resetRootComponentType(n) {
            (this.rootComponentType = n),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(n) {
            this.transitions.next({ ...this.transitions.value, ...n });
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    const i = { replaceUrl: !0 },
                      s = n.state?.navigationId ? n.state : null;
                    if (s) {
                      const a = { ...s };
                      delete a.navigationId,
                        delete a.ɵrouterPageId,
                        0 !== Object.keys(a).length && (i.state = a);
                    }
                    const o = this.parseUrl(n.url);
                    this.scheduleNavigation(o, r, s, i);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(n) {
            this.events.next(n);
          }
          resetConfig(n) {
            (this.config = n.map(Bf)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: i,
                queryParams: s,
                fragment: o,
                queryParamsHandling: a,
                preserveFragment: l,
              } = r,
              u = i || this.routerState.root,
              c = l ? this.currentUrlTree.fragment : o;
            let d = null;
            switch (a) {
              case "merge":
                d = { ...this.currentUrlTree.queryParams, ...s };
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = s || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              U1(u, this.currentUrlTree, n, d, c ?? null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const i = Ir(n) ? n : this.parseUrl(n),
              s = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
            return this.scheduleNavigation(s, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function DL(e) {
                for (let t = 0; t < e.length; t++) {
                  if (null == e[t]) throw new D(4008, false);
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (i) {
              r = this.malformedUriErrorHandler(i, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let i;
            if (((i = !0 === r ? { ...yL } : !1 === r ? { ...vL } : r), Ir(n)))
              return eE(this.currentUrlTree, n, i);
            const s = this.parseUrl(n);
            return eE(this.currentUrlTree, s, i);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, i) => {
              const s = n[i];
              return null != s && (r[i] = s), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (n) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = n.id),
                  (this.currentPageId = n.targetPageId),
                  this.events.next(
                    new Mr(
                      n.id,
                      this.serializeUrl(n.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  this.titleStrategy?.updateTitle(this.routerState.snapshot),
                  n.resolve(!0);
              },
              (n) => {
                this.console.warn(`Unhandled Navigation Error: ${n}`);
              }
            );
          }
          scheduleNavigation(n, r, i, s, o) {
            if (this.disposed) return Promise.resolve(!1);
            let a, l, u;
            o
              ? ((a = o.resolve), (l = o.reject), (u = o.promise))
              : (u = new Promise((f, h) => {
                  (a = f), (l = h);
                }));
            const c = ++this.navigationId;
            let d;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (i = this.location.getState()),
                  (d =
                    i && i.ɵrouterPageId
                      ? i.ɵrouterPageId
                      : s.replaceUrl || s.skipLocationChange
                      ? this.browserPageId ?? 0
                      : (this.browserPageId ?? 0) + 1))
                : (d = 0),
              this.setTransition({
                id: c,
                targetPageId: d,
                source: r,
                restoredState: i,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: n,
                extras: s,
                resolve: a,
                reject: l,
                promise: u,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              u.catch((f) => Promise.reject(f))
            );
          }
          setBrowserUrl(n, r) {
            const i = this.urlSerializer.serialize(n),
              s = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, r.targetPageId),
              };
            this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl
              ? this.location.replaceState(i, "", s)
              : this.location.go(i, "", s);
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const i = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !== this.currentNavigation?.finalUrl) ||
              0 === i
                ? this.currentUrlTree === this.currentNavigation?.finalUrl &&
                  0 === i &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(i);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(n, r, i) {
            const s = new _l(n.id, this.serializeUrl(n.extractedUrl), r, i);
            this.triggerEvent(s), n.resolve(!1);
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            lc();
          }),
          (e.ɵprov = V({
            token: e,
            factory: function () {
              return GE();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      function qE(e) {
        return "imperative" !== e;
      }
      class KE {}
      let CL = (() => {
        class e {
          constructor(n, r, i, s, o) {
            (this.router = n),
              (this.injector = i),
              (this.preloadingStrategy = s),
              (this.loader = o);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                Nn((n) => n instanceof Mr),
                Cr(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const i = [];
            for (const s of r) {
              s.providers &&
                !s._injector &&
                (s._injector = ma(s.providers, n, `Route: ${s.path}`));
              const o = s._injector ?? n,
                a = s._loadedInjector ?? o;
              (s.loadChildren && !s._loadedRoutes && void 0 === s.canLoad) ||
              (s.loadComponent && !s._loadedComponent)
                ? i.push(this.preloadConfig(o, s))
                : (s.children || s._loadedRoutes) &&
                  i.push(this.processRoutes(a, s.children ?? s._loadedRoutes));
            }
            return Ve(i).pipe(Pr());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let i;
              i =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : A(null);
              const s = i.pipe(
                Ue((o) =>
                  null === o
                    ? A(void 0)
                    : ((r._loadedRoutes = o.routes),
                      (r._loadedInjector = o.injector),
                      this.processRoutes(o.injector ?? n, o.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? Ve([s, this.loader.loadComponent(r)]).pipe(Pr())
                : s;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I($e), I(od), I($n), I(KE), I(Wf));
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Kf = new k("");
      let QE = (() => {
        class e {
          constructor(n, r, i = {}) {
            (this.router = n),
              (this.viewportScroller = r),
              (this.options = i),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (i.scrollPositionRestoration =
                i.scrollPositionRestoration || "disabled"),
              (i.anchorScrolling = i.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.router.events.subscribe((n) => {
              n instanceof Rf
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof Mr &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.router.parseUrl(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.router.events.subscribe((n) => {
              n instanceof gE &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.router.triggerEvent(
              new gE(
                n,
                "popstate" === this.lastSource
                  ? this.store[this.restoredId]
                  : null,
                r
              )
            );
          }
          ngOnDestroy() {
            this.routerEventsSubscription &&
              this.routerEventsSubscription.unsubscribe(),
              this.scrollEventsSubscription &&
                this.scrollEventsSubscription.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            lc();
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Ri(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function Qf(e) {
        return [{ provide: zf, multi: !0, useValue: e }];
      }
      function ZE() {
        const e = be(Nt);
        return (t) => {
          const n = e.get(Is);
          if (t !== n.components[0]) return;
          const r = e.get($e),
            i = e.get(XE);
          1 === e.get(Yf) && r.initialNavigation(),
            e.get(JE, null, x.Optional)?.setUpPreloading(),
            e.get(Kf, null, x.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            i.closed || (i.next(), i.unsubscribe());
        };
      }
      const XE = new k("", { factory: () => new $t() }),
        Yf = new k("", { providedIn: "root", factory: () => 1 });
      const JE = new k("");
      function IL(e) {
        return Ri(0, [
          { provide: JE, useExisting: CL },
          { provide: KE, useExisting: e },
        ]);
      }
      const ew = new k("ROUTER_FORROOT_GUARD"),
        ML = [
          Ed,
          { provide: iE, useClass: bf },
          { provide: $e, useFactory: GE },
          Qs,
          {
            provide: Ar,
            useFactory: function YE(e) {
              return e.routerState.root;
            },
            deps: [$e],
          },
          Wf,
        ];
      function AL() {
        return new jv("Router", $e);
      }
      let tw = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                ML,
                [],
                Qf(n),
                {
                  provide: ew,
                  useFactory: PL,
                  deps: [[$e, new Ji(), new es()]],
                },
                { provide: Al, useValue: r || {} },
                r?.useHash
                  ? { provide: _r, useClass: dR }
                  : { provide: _r, useClass: d_ },
                {
                  provide: Kf,
                  useFactory: () => {
                    const e = be($e),
                      t = be(MN),
                      n = be(Al);
                    return (
                      n.scrollOffset && t.setOffset(n.scrollOffset),
                      new QE(e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? IL(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: jv, multi: !0, useFactory: AL },
                r?.initialNavigation ? OL(r) : [],
                [
                  { provide: nw, useFactory: ZE },
                  { provide: xv, multi: !0, useExisting: nw },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: e, providers: [Qf(n)] };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(ew, 8));
          }),
          (e.ɵmod = Ze({ type: e })),
          (e.ɵinj = He({ imports: [kf] })),
          e
        );
      })();
      function PL(e) {
        return "guarded";
      }
      function OL(e) {
        return [
          "disabled" === e.initialNavigation
            ? Ri(3, [
                {
                  provide: Ea,
                  multi: !0,
                  useFactory: () => {
                    const t = be($e);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Yf, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? Ri(2, [
                { provide: Yf, useValue: 0 },
                {
                  provide: Ea,
                  multi: !0,
                  deps: [Nt],
                  useFactory: (t) => {
                    const n = t.get(uR, Promise.resolve());
                    let r = !1;
                    return () =>
                      n.then(
                        () =>
                          new Promise((s) => {
                            const o = t.get($e),
                              a = t.get(XE);
                            (function i(s) {
                              t.get($e)
                                .events.pipe(
                                  Nn(
                                    (a) =>
                                      a instanceof Mr ||
                                      a instanceof _l ||
                                      a instanceof pE
                                  ),
                                  J(
                                    (a) =>
                                      a instanceof Mr ||
                                      (a instanceof _l &&
                                        (0 === a.code || 1 === a.code) &&
                                        null)
                                  ),
                                  Nn((a) => null !== a),
                                  $s(1)
                                )
                                .subscribe(() => {
                                  s();
                                });
                            })(() => {
                              s(!0), (r = !0);
                            }),
                              (o.afterPreactivation = () => (
                                s(!0), r || a.closed ? A(void 0) : a
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const nw = new k(""),
        LL = [];
      let kL = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Ze({ type: e })),
          (e.ɵinj = He({ imports: [tw.forRoot(LL), tw] })),
          e
        );
      })();
      class BL {
        constructor(t) {
          this.notifier = t;
        }
        call(t, n) {
          const r = new jL(t),
            i = uo(this.notifier, new ao(r));
          return i && !r.seenValue ? (r.add(i), n.subscribe(r)) : r;
        }
      }
      class jL extends lo {
        constructor(t) {
          super(t), (this.seenValue = !1);
        }
        notifyNext() {
          (this.seenValue = !0), this.complete();
        }
        notifyComplete() {}
      }
      const $L = ["overlay"];
      function UL(e, t) {
        1 & e && he(0, "div");
      }
      function HL(e, t) {
        if ((1 & e && (M(0, "div"), ae(1, UL, 1, 0, "div", 6), P()), 2 & e)) {
          const n = Dt(2);
          ca(n.spinner.class),
            mi("color", n.spinner.color),
            ie(1),
            Z("ngForOf", n.spinner.divArray);
        }
      }
      function zL(e, t) {
        1 & e &&
          (he(0, "div", 7),
          (function Jy(e, t) {
            const n = Y();
            let r;
            const i = e + 22;
            n.firstCreatePass
              ? ((r = (function VM(e, t) {
                  if (t)
                    for (let n = t.length - 1; n >= 0; n--) {
                      const r = t[n];
                      if (e === r.name) return r;
                    }
                })(t, n.pipeRegistry)),
                (n.data[i] = r),
                r.onDestroy &&
                  (n.destroyHooks || (n.destroyHooks = [])).push(
                    i,
                    r.onDestroy
                  ))
              : (r = n.data[i]);
            const s = r.factory || (r.factory = ar(r.type)),
              o = Mt(T);
            try {
              const a = Ao(!1),
                l = s();
              return (
                Ao(a),
                (function NI(e, t, n, r) {
                  n >= e.data.length &&
                    ((e.data[n] = null), (e.blueprint[n] = null)),
                    (t[n] = r);
                })(n, v(), i, l),
                l
              );
            } finally {
              Mt(o);
            }
          })(1, "safeHtml")),
          2 & e &&
            Z(
              "innerHTML",
              (function ev(e, t, n) {
                const r = e + 22,
                  i = v(),
                  s = Br(i, r);
                return (function bs(e, t) {
                  return e[1].data[t].pure;
                })(i, r)
                  ? Ky(i, tt(), t, s.transform, n, s)
                  : s.transform(n);
              })(1, 1, Dt(2).template),
              Zp
            );
      }
      function WL(e, t) {
        if (
          (1 & e &&
            (M(0, "div", 1, 2),
            ae(2, HL, 2, 5, "div", 3),
            ae(3, zL, 2, 3, "div", 4),
            M(4, "div", 5),
            pr(5),
            P()()),
          2 & e)
        ) {
          const n = Dt();
          mi("background-color", n.spinner.bdColor)(
            "z-index",
            n.spinner.zIndex
          )("position", n.spinner.fullScreen ? "fixed" : "absolute"),
            Z("@.disabled", n.disableAnimation)("@fadeIn", "in"),
            ie(2),
            Z("ngIf", !n.template),
            ie(1),
            Z("ngIf", n.template),
            ie(1),
            mi("z-index", n.spinner.zIndex);
        }
      }
      const GL = ["*"],
        qL = {
          "ball-8bits": 16,
          "ball-atom": 4,
          "ball-beat": 3,
          "ball-circus": 5,
          "ball-climbing-dot": 4,
          "ball-clip-rotate": 1,
          "ball-clip-rotate-multiple": 2,
          "ball-clip-rotate-pulse": 2,
          "ball-elastic-dots": 5,
          "ball-fall": 3,
          "ball-fussion": 4,
          "ball-grid-beat": 9,
          "ball-grid-pulse": 9,
          "ball-newton-cradle": 4,
          "ball-pulse": 3,
          "ball-pulse-rise": 5,
          "ball-pulse-sync": 3,
          "ball-rotate": 1,
          "ball-running-dots": 5,
          "ball-scale": 1,
          "ball-scale-multiple": 3,
          "ball-scale-pulse": 2,
          "ball-scale-ripple": 1,
          "ball-scale-ripple-multiple": 3,
          "ball-spin": 8,
          "ball-spin-clockwise": 8,
          "ball-spin-clockwise-fade": 8,
          "ball-spin-clockwise-fade-rotating": 8,
          "ball-spin-fade": 8,
          "ball-spin-fade-rotating": 8,
          "ball-spin-rotate": 2,
          "ball-square-clockwise-spin": 8,
          "ball-square-spin": 8,
          "ball-triangle-path": 3,
          "ball-zig-zag": 2,
          "ball-zig-zag-deflect": 2,
          cog: 1,
          "cube-transition": 2,
          fire: 3,
          "line-scale": 5,
          "line-scale-party": 5,
          "line-scale-pulse-out": 5,
          "line-scale-pulse-out-rapid": 5,
          "line-spin-clockwise-fade": 8,
          "line-spin-clockwise-fade-rotating": 8,
          "line-spin-fade": 8,
          "line-spin-fade-rotating": 8,
          pacman: 6,
          "square-jelly-box": 2,
          "square-loader": 1,
          "square-spin": 1,
          timer: 1,
          "triangle-skew-spin": 1,
        },
        Xf = "primary";
      class Rr {
        constructor(t) {
          Object.assign(this, t);
        }
        static create(t) {
          return (
            (null == t?.type || 0 === t.type.length) &&
              console.warn(
                '[ngx-spinner]: Property "type" is missed. Please, provide animation type to <ngx-spinner> component\n        and ensure css is added to angular.json file'
              ),
            new Rr(t)
          );
        }
      }
      let rw = (() => {
        class e {
          constructor() {
            this.spinnerObservable = new Vt(null);
          }
          getSpinner(n) {
            return this.spinnerObservable
              .asObservable()
              .pipe(Nn((r) => r && r.name === n));
          }
          show(n = Xf, r) {
            return new Promise((i, s) => {
              setTimeout(() => {
                r && Object.keys(r).length
                  ? ((r.name = n),
                    this.spinnerObservable.next(new Rr({ ...r, show: !0 })),
                    i(!0))
                  : (this.spinnerObservable.next(new Rr({ name: n, show: !0 })),
                    i(!0));
              }, 10);
            });
          }
          hide(n = Xf, r = 10) {
            return new Promise((i, s) => {
              setTimeout(() => {
                this.spinnerObservable.next(new Rr({ name: n, show: !1 })),
                  i(!0);
              }, r);
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const iw = new k("NGX_SPINNER_CONFIG");
      let KL = (() => {
          class e {
            constructor(n) {
              this._sanitizer = n;
            }
            transform(n) {
              if (n) return this._sanitizer.bypassSecurityTrustHtml(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(X_, 16));
            }),
            (e.ɵpipe = Xe({ name: "safeHtml", type: e, pure: !0 })),
            e
          );
        })(),
        QL = (() => {
          class e {
            constructor(n, r, i, s) {
              (this.spinnerService = n),
                (this.changeDetector = r),
                (this.elementRef = i),
                (this.globalConfig = s),
                (this.disableAnimation = !1),
                (this.spinner = new Rr()),
                (this.ngUnsubscribe = new $t()),
                (this.setDefaultOptions = () => {
                  const { type: o } = this.globalConfig ?? {};
                  this.spinner = Rr.create({
                    name: this.name,
                    bdColor: this.bdColor,
                    size: this.size,
                    color: this.color,
                    type: this.type ?? o,
                    fullScreen: this.fullScreen,
                    divArray: this.divArray,
                    divCount: this.divCount,
                    show: this.show,
                    zIndex: this.zIndex,
                    template: this.template,
                    showSpinner: this.showSpinner,
                  });
                }),
                (this.bdColor = "rgba(51,51,51,0.8)"),
                (this.zIndex = 99999),
                (this.color = "#fff"),
                (this.size = "large"),
                (this.fullScreen = !0),
                (this.name = Xf),
                (this.template = null),
                (this.showSpinner = !1),
                (this.divArray = []),
                (this.divCount = 0),
                (this.show = !1);
            }
            handleKeyboardEvent(n) {
              this.spinnerDOM &&
                this.spinnerDOM.nativeElement &&
                (this.fullScreen ||
                  (!this.fullScreen && this.isSpinnerZone(n.target))) &&
                ((n.returnValue = !1), n.preventDefault());
            }
            initObservable() {
              this.spinnerService
                .getSpinner(this.name)
                .pipe(
                  (function VL(e) {
                    return (t) => t.lift(new BL(e));
                  })(this.ngUnsubscribe)
                )
                .subscribe((n) => {
                  this.setDefaultOptions(),
                    Object.assign(this.spinner, n),
                    n.show && this.onInputChange(),
                    this.changeDetector.detectChanges();
                });
            }
            ngOnInit() {
              this.setDefaultOptions(), this.initObservable();
            }
            isSpinnerZone(n) {
              return (
                n === this.elementRef.nativeElement.parentElement ||
                (n.parentNode && this.isSpinnerZone(n.parentNode))
              );
            }
            ngOnChanges(n) {
              for (const r in n)
                if (r) {
                  const i = n[r];
                  if (i.isFirstChange()) return;
                  typeof i.currentValue < "u" &&
                    i.currentValue !== i.previousValue &&
                    "" !== i.currentValue &&
                    ((this.spinner[r] = i.currentValue),
                    "showSpinner" === r &&
                      (i.currentValue
                        ? this.spinnerService.show(
                            this.spinner.name,
                            this.spinner
                          )
                        : this.spinnerService.hide(this.spinner.name)),
                    "name" === r && this.initObservable());
                }
            }
            getClass(n, r) {
              (this.spinner.divCount = qL[n]),
                (this.spinner.divArray = Array(this.spinner.divCount)
                  .fill(0)
                  .map((s, o) => o));
              let i = "";
              switch (r.toLowerCase()) {
                case "small":
                  i = "la-sm";
                  break;
                case "medium":
                  i = "la-2x";
                  break;
                case "large":
                  i = "la-3x";
              }
              return "la-" + n + " " + i;
            }
            onInputChange() {
              this.spinner.class = this.getClass(
                this.spinner.type,
                this.spinner.size
              );
            }
            ngOnDestroy() {
              this.ngUnsubscribe.next(), this.ngUnsubscribe.complete();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(rw), T(Sa), T(qt), T(iw, 8));
            }),
            (e.ɵcmp = ze({
              type: e,
              selectors: [["ngx-spinner"]],
              viewQuery: function (n, r) {
                if (
                  (1 & n &&
                    (function ov(e, t, n) {
                      const r = Y();
                      r.firstCreatePass &&
                        (lv(r, new iv(e, t, n), -1),
                        2 == (2 & t) && (r.staticViewQueries = !0)),
                        av(r, v(), t);
                    })($L, 5),
                  2 & n)
                ) {
                  let i;
                  zn((i = Wn())) && (r.spinnerDOM = i.first);
                }
              },
              hostBindings: function (n, r) {
                1 & n &&
                  pi(
                    "keydown",
                    function (s) {
                      return r.handleKeyboardEvent(s);
                    },
                    0,
                    cg
                  );
              },
              inputs: {
                bdColor: "bdColor",
                size: "size",
                color: "color",
                type: "type",
                fullScreen: "fullScreen",
                name: "name",
                zIndex: "zIndex",
                template: "template",
                showSpinner: "showSpinner",
                disableAnimation: "disableAnimation",
              },
              features: [kn],
              ngContentSelectors: GL,
              decls: 1,
              vars: 1,
              consts: [
                [
                  "class",
                  "ngx-spinner-overlay",
                  3,
                  "background-color",
                  "z-index",
                  "position",
                  4,
                  "ngIf",
                ],
                [1, "ngx-spinner-overlay"],
                ["overlay", ""],
                [3, "class", "color", 4, "ngIf"],
                [3, "innerHTML", 4, "ngIf"],
                [1, "loading-text"],
                [4, "ngFor", "ngForOf"],
                [3, "innerHTML"],
              ],
              template: function (n, r) {
                1 & n && (gs(), ae(0, WL, 6, 12, "div", 0)),
                  2 & n && Z("ngIf", r.spinner.show);
              },
              dependencies: [ja, $a, KL],
              styles: [
                ".ngx-spinner-overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%}.ngx-spinner-overlay[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(.loading-text){top:50%;left:50%;margin:0;position:absolute;transform:translate(-50%,-50%)}.loading-text[_ngcontent-%COMP%]{position:absolute;top:60%;left:50%;transform:translate(-50%,-60%)}",
              ],
              data: {
                animation: [
                  Lx("fadeIn", [
                    kx("in", Os({ opacity: 1 })),
                    rD(":enter", [Os({ opacity: 0 }), tD(300)]),
                    rD(":leave", tD(200, Os({ opacity: 0 }))),
                  ]),
                ],
              },
              changeDetection: 0,
            })),
            e
          );
        })(),
        YL = (() => {
          class e {
            static forRoot(n) {
              return { ngModule: e, providers: [{ provide: iw, useValue: n }] };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ imports: [Kn] })),
            e
          );
        })(),
        ZL = (() => {
          class e {
            ngOnInit() {}
            gotoTop() {
              window.scroll({ top: 0, left: 0, behavior: "smooth" });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = ze({
              type: e,
              selectors: [["app-header"]],
              decls: 13,
              vars: 0,
              consts: [
                ["id", "home", 1, "topnav"],
                [1, "home"],
                ["href", "#home", 3, "click"],
                [1, "pi", "pi-home", 2, "font-size", "24px", "color", "white"],
                [1, "menu"],
                ["href", "#contact"],
                ["href", "#skills"],
                ["href", "#education"],
                ["href", "#experience"],
              ],
              template: function (n, r) {
                1 & n &&
                  (M(0, "div", 0)(1, "div", 1)(2, "a", 2),
                  pi("click", function () {
                    return r.gotoTop();
                  }),
                  he(3, "i", 3),
                  P()(),
                  M(4, "div", 4)(5, "a", 5),
                  ge(6, "Contact"),
                  P(),
                  M(7, "a", 6),
                  ge(8, "Skills"),
                  P(),
                  M(9, "a", 7),
                  ge(10, "Education"),
                  P(),
                  M(11, "a", 8),
                  ge(12, "Experience"),
                  P()()());
              },
              styles: [
                ".topnav[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;background-color:#333;overflow:hidden;position:sticky;top:0;z-index:100;height:auto}.topnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{float:right;color:#f2f2f2;text-align:center;line-height:50px;padding-left:15px;padding-right:15px;text-decoration:none;font-size:17px;transition:.4s}.topnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:#ddd;color:#000}.topnav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]{background-color:#04aa6d;color:#fff}.home[_ngcontent-%COMP%]{background-color:#04aa6d}.menu[_ngcontent-%COMP%]{margin-left:auto}.scroll-with-offset[_ngcontent-%COMP%]{padding-top:100px;margin-bottom:-100px}",
              ],
            })),
            e
          );
        })(),
        XL = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = ze({
              type: e,
              selectors: [["app-footer"]],
              decls: 4,
              vars: 0,
              consts: [
                [1, "spacing"],
                [1, "footer"],
                [1, "p-footer"],
              ],
              template: function (n, r) {
                1 & n &&
                  (M(0, "div", 0)(1, "div", 1)(2, "p", 2),
                  ge(3, "Created by Bruno Omizu - 2022"),
                  P()()());
              },
              styles: [
                ".footer[_ngcontent-%COMP%]{background-color:#333;overflow:hidden;position:sticky;text-align:center;justify-content:center;vertical-align:middle;color:#fff;font-size:12px;height:50px}.p-footer[_ngcontent-%COMP%]{margin:0;line-height:50px}",
              ],
            })),
            e
          );
        })(),
        JL = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = ze({
              type: e,
              selectors: [["app-main-page"]],
              decls: 43,
              vars: 0,
              consts: [
                [1, "flex-container-main"],
                [1, "image"],
                ["src", "assets/images/bruno.jpeg", "alt", ""],
                [1, "details"],
                [1, "details-header"],
                [1, "details-contact"],
                [1, "flex-container-social-main"],
                [1, "flex-container-social-box"],
                [1, "flex-container-social-item"],
                ["href", "https://www.linkedin.com/in/brunomizu/"],
                [1, "pi", "pi-linkedin", 2, "font-size", "24px"],
                ["href", "https://www.facebook.com/bruno.omizu/"],
                [1, "pi", "pi-facebook", 2, "font-size", "24px"],
                ["href", "https://github.com/brnomz/my-digital-cv"],
                [1, "pi", "pi-github", 2, "font-size", "24px"],
                ["href", "https://www.instagram.com/brunomizu/"],
                [1, "pi", "pi-instagram", 2, "font-size", "24px"],
                [1, "flex-container-intro"],
                [1, "flex-container-intro-box"],
                [1, "intro-hello"],
              ],
              template: function (n, r) {
                1 & n &&
                  (M(0, "div", 0)(1, "div", 1),
                  he(2, "img", 2),
                  P(),
                  M(3, "div", 3)(4, "div", 4)(5, "h1"),
                  ge(6, "Bruno Omizu"),
                  P(),
                  M(7, "p"),
                  ge(8, "Solutions Architect | Technical Lead"),
                  P(),
                  M(9, "p"),
                  ge(10, "New Zealand Permanent Resident"),
                  P()(),
                  M(11, "div", 5)(12, "div")(13, "h4")(14, "strong"),
                  ge(15, "Date of Birth"),
                  P()(),
                  M(16, "p"),
                  ge(17, "November 12th, 1985"),
                  P()()()()(),
                  M(18, "div", 6)(19, "div", 7)(20, "div", 8)(21, "a", 9),
                  he(22, "i", 10),
                  P()(),
                  M(23, "div", 8)(24, "a", 11),
                  he(25, "i", 12),
                  P()(),
                  M(26, "div", 8)(27, "a", 13),
                  he(28, "i", 14),
                  P()(),
                  M(29, "div", 8)(30, "a", 15),
                  he(31, "i", 16),
                  P()()()(),
                  M(32, "div", 17)(33, "div", 18)(34, "div", 19)(35, "span"),
                  ge(36, "HELLO, I AM BRUNO."),
                  P()(),
                  M(37, "p"),
                  ge(
                    38,
                    " I am a Solutions Architect with over 15 years of experience in Software Engineering, Integration, Cloud, and DevOps. My passion is to work with technology, understanding how it functions and what possibilities it offers. "
                  ),
                  P(),
                  M(39, "p"),
                  ge(
                    40,
                    " As a part of my ongoing learning journey, I have built this CV webpage using Angular and PrimeNg components as an experiment to enhance my front-end skills. You can find the complete code for this website on my GitHub repository (link provided above). I hope you discover the necessary information to consider me for a suitable position. "
                  ),
                  P(),
                  M(41, "p"),
                  ge(
                    42,
                    " I have a preference for permanent roles, whether remote or hybrid (being in the office twice a week is also acceptable). I am also able to provide references upon request. "
                  ),
                  P()()());
              },
              styles: [
                ".flex-container-main[_ngcontent-%COMP%]{display:flex;flex-direction:row;background-color:#eaecee;width:100%;height:auto;position:relative;overflow:hidden}a[_ngcontent-%COMP%]{color:inherit}.intro-hello[_ngcontent-%COMP%]{padding-bottom:20px}.image[_ngcontent-%COMP%]{display:block;margin-top:80px;height:350px;width:350px;margin-left:auto;margin-right:0}img[_ngcontent-%COMP%]{height:100%;width:100%;object-fit:contain}.details[_ngcontent-%COMP%]{display:block;margin-top:80px;margin-left:0;margin-right:auto;height:350px;width:348px;background-color:#ebedef;font-size:14px;padding-left:15px;border:1px solid lightgrey}.details-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-bottom:0}.details-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:0;margin-bottom:0}.details-contact[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-top:14px;margin-bottom:0}.details-contact[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:0;margin-bottom:0;font-size:13px}.flex-container-social-main[_ngcontent-%COMP%]{display:flex;flex-direction:row;width:100%;height:auto;position:relative;overflow:hidden}.flex-container-social-box[_ngcontent-%COMP%]{align-items:center;justify-content:center;display:flex;flex-direction:row;flex-wrap:wrap;width:100%;height:auto;background-color:#85929e;margin:1px auto;width:698px;padding:10px;font-size:30px}.flex-container-social-item[_ngcontent-%COMP%]{align-items:center;justify-content:center;margin:5px;padding:5px;height:42px;width:42px}.flex-container-intro[_ngcontent-%COMP%]{display:flex;flex-direction:row;width:100%;position:relative;overflow:hidden}.flex-container-intro-box[_ngcontent-%COMP%]{align-items:center;justify-content:center;display:flex;flex-direction:row;flex-wrap:wrap;width:100%;margin-left:auto;margin-right:auto;width:675px;padding:20px;line-height:1.5em;font-size:15px}.flex-container-intro[_ngcontent-%COMP%]   .intro-hello[_ngcontent-%COMP%]{font-size:20px;margin-top:10px;margin-bottom:5px}.flex-container-intro-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:10px;text-align:justify}",
              ],
            })),
            e
          );
        })();
      const sw = ["*"];
      let Pl = (() => {
          class e {}
          return (
            (e.ALIGN_CENTER = "pi pi-align-center"),
            (e.ALIGN_JUSTIFY = "pi pi-align-justify"),
            (e.ALIGN_LEFT = "pi pi-align-left"),
            (e.ALIGN_RIGHT = "pi pi-align-right"),
            (e.AMAZON = "pi pi-amazon"),
            (e.ANDROID = "pi pi-android"),
            (e.ANGLE_DOUBLE_DOWN = "pi pi-angle-double-down"),
            (e.ANGLE_DOUBLE_LEFT = "pi pi-angle-double-left"),
            (e.ANGLE_DOUBLE_RIGHT = "pi pi-angle-double-right"),
            (e.ANGLE_DOUBLE_UP = "pi pi-angle-double-up"),
            (e.ANGLE_DOWN = "pi pi-angle-down"),
            (e.ANGLE_LEFT = "pi pi-angle-left"),
            (e.ANGLE_RIGHT = "pi pi-angle-right"),
            (e.ANGLE_UP = "pi pi-angle-up"),
            (e.APPLE = "pi pi-apple"),
            (e.ARROWS_ALT = "pi pi-arrows-alt"),
            (e.ARROW_CIRCLE_DOWN = "pi pi-arrow-circle-down"),
            (e.ARROW_CIRCLE_LEFT = "pi pi-arrow-circle-left"),
            (e.ARROW_CIRCLE_RIGHT = "pi pi-arrow-circle-right"),
            (e.ARROW_CIRCLE_UP = "pi pi-arrow-circle-up"),
            (e.ARROW_DOWN = "pi pi-arrow-down"),
            (e.ARROW_DOWN_LEFT = "pi pi-arrow-down-left"),
            (e.ARROW_DOWN_RIGHT = "pi pi-arrow-down-right"),
            (e.ARROW_LEFT = "pi pi-arrow-left"),
            (e.ARROW_RIGHT_ARROW_LEFT = "pi pi-arrow-right-arrow-left"),
            (e.ARROW_RIGHT = "pi pi-arrow-right"),
            (e.ARROW_UP = "pi pi-arrow-up"),
            (e.ARROW_UP_LEFT = "pi pi-arrow-up-left"),
            (e.ARROW_UP_RIGHT = "pi pi-arrow-up-right"),
            (e.ARROW_H = "pi pi-arrows-h"),
            (e.ARROW_V = "pi pi-arrows-v"),
            (e.AT = "pi pi-at"),
            (e.BACKWARD = "pi pi-backward"),
            (e.BAN = "pi pi-ban"),
            (e.BARS = "pi pi-bars"),
            (e.BELL = "pi pi-bell"),
            (e.BITCOIN = "pi pi-bitcoin"),
            (e.BOLT = "pi pi-bolt"),
            (e.BOOK = "pi pi-book"),
            (e.BOOKMARK = "pi pi-bookmark"),
            (e.BOOKMARK_FILL = "pi pi-bookmark-fill"),
            (e.BOX = "pi pi-box"),
            (e.BRIEFCASE = "pi pi-briefcase"),
            (e.BUILDING = "pi pi-building"),
            (e.CALCULATOR = "pi pi-calculator"),
            (e.CALENDAR = "pi pi-calendar"),
            (e.CALENDAR_MINUS = "pi pi-calendar-minus"),
            (e.CALENDAR_PLUS = "pi pi-calendar-plus"),
            (e.CALENDAR_TIMES = "pi pi-calendar-times"),
            (e.CAMERA = "pi pi-camera"),
            (e.CAR = "pi pi-car"),
            (e.CARET_DOWN = "pi pi-caret-down"),
            (e.CARET_LEFT = "pi pi-caret-left"),
            (e.CARET_RIGHT = "pi pi-caret-right"),
            (e.CARET_UP = "pi pi-caret-up"),
            (e.CART_PLUS = "pi pi-cart-plus"),
            (e.CHART_BAR = "pi pi-chart-bar"),
            (e.CHART_LINE = "pi pi-chart-line"),
            (e.CHART_PIE = "pi pi-chart-pie"),
            (e.CHECK = "pi pi-check"),
            (e.CHECK_CIRCLE = "pi pi-check-circle"),
            (e.CHECK_SQUARE = "pi pi-check-square"),
            (e.CHEVRON_CIRCLE_DOWN = "pi pi-chevron-circle-down"),
            (e.CHEVRON_CIRCLE_LEFT = "pi pi-chevron-circle-left"),
            (e.CHEVRON_CIRCLE_RIGHT = "pi pi-chevron-circle-right"),
            (e.CHEVRON_CIRCLE_UP = "pi pi-chevron-circle-up"),
            (e.CHEVRON_DOWN = "pi pi-chevron-down"),
            (e.CHEVRON_LEFT = "pi pi-chevron-left"),
            (e.CHEVRON_RIGHT = "pi pi-chevron-right"),
            (e.CHEVRON_UP = "pi pi-chevron-up"),
            (e.CIRCLE = "pi pi-circle"),
            (e.CIRCLE_FILL = "pi pi-circle-fill"),
            (e.CLOCK = "pi pi-clock"),
            (e.CLONE = "pi pi-clone"),
            (e.CLOUD = "pi pi-cloud"),
            (e.CLOUD_DOWNLOAD = "pi pi-cloud-download"),
            (e.CLOUD_UPLOAD = "pi pi-cloud-upload"),
            (e.CODE = "pi pi-code"),
            (e.COG = "pi pi-cog"),
            (e.COMMENT = "pi pi-comment"),
            (e.COMMENTS = "pi pi-comments"),
            (e.COMPASS = "pi pi-compass"),
            (e.COPY = "pi pi-copy"),
            (e.CREDIT_CARD = "pi pi-credit-card"),
            (e.DATABASE = "pi pi-database"),
            (e.DESKTOP = "pi pi-desktop"),
            (e.DELETE_LEFT = "pi pi-delete-left"),
            (e.DIRECTIONS = "pi pi-directions"),
            (e.DIRECTIONS_ALT = "pi pi-directions-alt"),
            (e.DISCORD = "pi pi-discord"),
            (e.DOLLAR = "pi pi-dollar"),
            (e.DOWNLOAD = "pi pi-download"),
            (e.EJECT = "pi pi-eject"),
            (e.ELLIPSIS_H = "pi pi-ellipsis-h"),
            (e.ELLIPSIS_V = "pi pi-ellipsis-v"),
            (e.ENVELOPE = "pi pi-envelope"),
            (e.ERASER = "pi pi-eraser"),
            (e.EURO = "pi pi-euro"),
            (e.EXCLAMATION_CIRCLE = "pi pi-exclamation-circle"),
            (e.EXCLAMATION_TRIANGLE = "pi pi-exclamation-triangle"),
            (e.EXTERNAL_LINK = "pi pi-external-link"),
            (e.EYE = "pi pi-eye"),
            (e.EYE_SLASH = "pi pi-eye-slash"),
            (e.FACEBOOK = "pi pi-facebook"),
            (e.FAST_BACKWARD = "pi pi-fast-backward"),
            (e.FAST_FORWARD = "pi pi-fast-forward"),
            (e.FILE = "pi pi-file"),
            (e.FILE_EDIT = "pi pi-file-edit"),
            (e.FILE_IMPORT = "pi pi-file-import"),
            (e.FILE_PDF = "pi pi-file-pdf"),
            (e.FILE_EXCEL = "pi pi-file-excel"),
            (e.FILE_EXPORT = "pi pi-file-export"),
            (e.FILE_WORD = "pi pi-file-word"),
            (e.FILTER = "pi pi-filter"),
            (e.FILTER_FILL = "pi pi-filter-fill"),
            (e.FILTER_SLASH = "pi pi-filter-slash"),
            (e.FLAG = "pi pi-flag"),
            (e.FLAG_FILL = "pi pi-flag-fill"),
            (e.FOLDER = "pi pi-folder"),
            (e.FOLDER_OPEN = "pi pi-folder-open"),
            (e.FORWARD = "pi pi-forward"),
            (e.GIFT = "pi pi-gift"),
            (e.GITHUB = "pi pi-github"),
            (e.GLOBE = "pi pi-globe"),
            (e.GOOGLE = "pi pi-google"),
            (e.HASHTAG = "pi pi-hashtag"),
            (e.HEART = "pi pi-heart"),
            (e.HEART_FILL = "pi pi-heart-fill"),
            (e.HISTORY = "pi pi-history"),
            (e.HOME = "pi pi-home"),
            (e.HOURGLASS = "pi pi-hourglass"),
            (e.ID_CARD = "pi pi-id-card"),
            (e.IMAGE = "pi pi-image"),
            (e.IMAGES = "pi pi-images"),
            (e.INBOX = "pi pi-inbox"),
            (e.INFO = "pi pi-info"),
            (e.INFO_CIRCLE = "pi pi-info-circle"),
            (e.INSTAGRAM = "pi pi-instagram"),
            (e.KEY = "pi pi-key"),
            (e.LANGUAGE = "pi pi-language"),
            (e.LINK = "pi pi-link"),
            (e.LINKEDIN = "pi pi-linkedin"),
            (e.LIST = "pi pi-list"),
            (e.LOCK = "pi pi-lock"),
            (e.LOCK_OPEN = "pi pi-lock-open"),
            (e.MAP = "pi pi-map"),
            (e.MAP_MARKER = "pi pi-map-marker"),
            (e.MEGAPHONE = "pi pi-megaphone"),
            (e.MICROPHONE = "pi pi-microphone"),
            (e.MICROSOFT = "pi pi-microsoft"),
            (e.MINUS = "pi pi-minus"),
            (e.MINUS_CIRCLE = "pi pi-minus-circle"),
            (e.MOBILE = "pi pi-mobile"),
            (e.MONEY_BILL = "pi pi-money-bill"),
            (e.MOON = "pi pi-moon"),
            (e.PALETTE = "pi pi-palette"),
            (e.PAPERCLIP = "pi pi-paperclip"),
            (e.PAUSE = "pi pi-pause"),
            (e.PAYPAL = "pi pi-paypal"),
            (e.PENCIL = "pi pi-pencil"),
            (e.PERCENTAGE = "pi pi-percentage"),
            (e.PHONE = "pi pi-phone"),
            (e.PLAY = "pi pi-play"),
            (e.PLUS = "pi pi-plus"),
            (e.PLUS_CIRCLE = "pi pi-plus-circle"),
            (e.POUND = "pi pi-pound"),
            (e.POWER_OFF = "pi pi-power-off"),
            (e.PRIME = "pi pi-prime"),
            (e.PRINT = "pi pi-print"),
            (e.QRCODE = "pi pi-qrcode"),
            (e.QUESTION = "pi pi-question"),
            (e.QUESTION_CIRCLE = "pi pi-question-circle"),
            (e.REDDIT = "pi pi-reddit"),
            (e.REFRESH = "pi pi-refresh"),
            (e.REPLAY = "pi pi-replay"),
            (e.REPLY = "pi pi-reply"),
            (e.SAVE = "pi pi-save"),
            (e.SEARCH = "pi pi-search"),
            (e.SEARCH_MINUS = "pi pi-search-minus"),
            (e.SEARCH_PLUS = "pi pi-search-plus"),
            (e.SEND = "pi pi-send"),
            (e.SERVER = "pi pi-server"),
            (e.SHARE_ALT = "pi pi-share-alt"),
            (e.SHIELD = "pi pi-shield"),
            (e.SHOPPING_BAG = "pi pi-shopping-bag"),
            (e.SHOPPING_CART = "pi pi-shopping-cart"),
            (e.SIGN_IN = "pi pi-sign-in"),
            (e.SIGN_OUT = "pi pi-sign-out"),
            (e.SITEMAP = "pi pi-sitemap"),
            (e.SLACK = "pi pi-slack"),
            (e.SLIDERS_H = "pi pi-sliders-h"),
            (e.SLIDERS_V = "pi pi-sliders-v"),
            (e.SORT = "pi pi-sort"),
            (e.SORT_ALPHA_DOWN = "pi pi-sort-alpha-down"),
            (e.SORT_ALPHA_ALT_DOWN = "pi pi-sort-alpha-alt-down"),
            (e.SORT_ALPHA_UP = "pi pi-sort-alpha-up"),
            (e.SORT_ALPHA_ALT_UP = "pi pi-sort-alpha-alt-up"),
            (e.SORT_ALT = "pi pi-sort-alt"),
            (e.SORT_ALT_SLASH = "pi pi-sort-slash"),
            (e.SORT_AMOUNT_DOWN = "pi pi-sort-amount-down"),
            (e.SORT_AMOUNT_DOWN_ALT = "pi pi-sort-amount-down-alt"),
            (e.SORT_AMOUNT_UP = "pi pi-sort-amount-up"),
            (e.SORT_AMOUNT_UP_ALT = "pi pi-sort-amount-up-alt"),
            (e.SORT_DOWN = "pi pi-sort-down"),
            (e.SORT_NUMERIC_DOWN = "pi pi-sort-numeric-down"),
            (e.SORT_NUMERIC_ALT_DOWN = "pi pi-sort-numeric-alt-down"),
            (e.SORT_NUMERIC_UP = "pi pi-sort-numeric-up"),
            (e.SORT_NUMERIC_ALT_UP = "pi pi-sort-numeric-alt-up"),
            (e.SORT_UP = "pi pi-sort-up"),
            (e.SPINNER = "pi pi-spinner"),
            (e.STAR = "pi pi-star"),
            (e.STAR_FILL = "pi pi-star-fill"),
            (e.STEP_BACKWARD = "pi pi-step-backward"),
            (e.STEP_BACKWARD_ALT = "pi pi-step-backward-alt"),
            (e.STEP_FORWARD = "pi pi-step-forward"),
            (e.STEP_FORWARD_ALT = "pi pi-step-forward-alt"),
            (e.STOP = "pi pi-stop"),
            (e.STOP_CIRCLE = "pi pi-stop-circle"),
            (e.STOPWATCH = "pi pi-stopwatch"),
            (e.SUN = "pi pi-sun"),
            (e.SYNC = "pi pi-sync"),
            (e.TABLE = "pi pi-table"),
            (e.TABLET = "pi pi-tablet"),
            (e.TAG = "pi pi-tag"),
            (e.TAGS = "pi pi-tags"),
            (e.TELEGRAM = "pi pi-telegram"),
            (e.TH_LARGE = "pi pi-th-large"),
            (e.THUMBS_DOWN = "pi pi-thumbs-down"),
            (e.THUMBS_DOWN_FILL = "pi pi-thumbs-down-fill"),
            (e.THUMBS_UP = "pi pi-thumbs-up"),
            (e.THUMBS_UP_FILL = "pi pi-thumbs-up-fill"),
            (e.TICKET = "pi pi-ticket"),
            (e.TIMES = "pi pi-times"),
            (e.TIMES_CIRCLE = "pi pi-times-circle"),
            (e.TRASH = "pi pi-trash"),
            (e.TRUCK = "pi pi-truck"),
            (e.TWITTER = "pi pi-twitter"),
            (e.UNDO = "pi pi-undo"),
            (e.UNLOCK = "pi pi-unlock"),
            (e.UPLOAD = "pi pi-upload"),
            (e.USER = "pi pi-user"),
            (e.USER_EDIT = "pi pi-user-edit"),
            (e.USER_MINUS = "pi pi-user-minus"),
            (e.USER_PLUS = "pi pi-user-plus"),
            (e.USERS = "pi pi-users"),
            (e.VERIFIED = "pi pi-verified"),
            (e.VIDEO = "pi pi-video"),
            (e.VIMEO = "pi pi-vimeo"),
            (e.VOLUME_DOWN = "pi pi-volume-down"),
            (e.VOLUME_OFF = "pi pi-volume-off"),
            (e.VOLUME_UP = "pi pi-volume-up"),
            (e.WALLET = "pi pi-wallet"),
            (e.WHATSAPP = "pi pi-whatsapp"),
            (e.WIFI = "pi pi-wifi"),
            (e.WINDOW_MAXIMIZE = "pi pi-window-maximize"),
            (e.WINDOW_MINIMIZE = "pi pi-window-minimize"),
            (e.WRENCH = "pi pi-wrench"),
            (e.YOUTUBE = "pi pi-youtube"),
            e
          );
        })(),
        ek = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = ze({
              type: e,
              selectors: [["p-header"]],
              ngContentSelectors: sw,
              decls: 1,
              vars: 0,
              template: function (n, r) {
                1 & n && (gs(), pr(0));
              },
              encapsulation: 2,
            })),
            e
          );
        })(),
        tk = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = ze({
              type: e,
              selectors: [["p-footer"]],
              ngContentSelectors: sw,
              decls: 1,
              vars: 0,
              template: function (n, r) {
                1 & n && (gs(), pr(0));
              },
              encapsulation: 2,
            })),
            e
          );
        })(),
        Ol = (() => {
          class e {
            constructor(n) {
              this.template = n;
            }
            getType() {
              return this.name;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(fn));
            }),
            (e.ɵdir = Be({
              type: e,
              selectors: [["", "pTemplate", ""]],
              inputs: { type: "type", name: ["pTemplate", "name"] },
            })),
            e
          );
        })(),
        ow = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ imports: [Kn] })),
            e
          );
        })();
      function nk(e, t) {
        1 & e && cn(0);
      }
      function rk(e, t) {
        if (
          (1 & e &&
            (M(0, "div", 8), pr(1, 1), ae(2, nk, 1, 0, "ng-container", 6), P()),
          2 & e)
        ) {
          const n = Dt();
          ie(2), Z("ngTemplateOutlet", n.headerTemplate);
        }
      }
      function ik(e, t) {
        1 & e && cn(0);
      }
      function sk(e, t) {
        if (
          (1 & e &&
            (M(0, "div", 9), ge(1), ae(2, ik, 1, 0, "ng-container", 6), P()),
          2 & e)
        ) {
          const n = Dt();
          ie(1),
            ys(" ", n.header, " "),
            ie(1),
            Z("ngTemplateOutlet", n.titleTemplate);
        }
      }
      function ok(e, t) {
        1 & e && cn(0);
      }
      function ak(e, t) {
        if (
          (1 & e &&
            (M(0, "div", 10), ge(1), ae(2, ok, 1, 0, "ng-container", 6), P()),
          2 & e)
        ) {
          const n = Dt();
          ie(1),
            ys(" ", n.subheader, " "),
            ie(1),
            Z("ngTemplateOutlet", n.subtitleTemplate);
        }
      }
      function lk(e, t) {
        1 & e && cn(0);
      }
      function uk(e, t) {
        1 & e && cn(0);
      }
      function ck(e, t) {
        if (
          (1 & e &&
            (M(0, "div", 11),
            pr(1, 2),
            ae(2, uk, 1, 0, "ng-container", 6),
            P()),
          2 & e)
        ) {
          const n = Dt();
          ie(2), Z("ngTemplateOutlet", n.footerTemplate);
        }
      }
      const dk = ["*", [["p-header"]], [["p-footer"]]],
        fk = ["*", "p-header", "p-footer"];
      let Jf = (() => {
          class e {
            constructor(n) {
              this.el = n;
            }
            ngAfterContentInit() {
              this.templates.forEach((n) => {
                switch (n.getType()) {
                  case "header":
                    this.headerTemplate = n.template;
                    break;
                  case "title":
                    this.titleTemplate = n.template;
                    break;
                  case "subtitle":
                    this.subtitleTemplate = n.template;
                    break;
                  case "content":
                  default:
                    this.contentTemplate = n.template;
                    break;
                  case "footer":
                    this.footerTemplate = n.template;
                }
              });
            }
            getBlockableElement() {
              return this.el.nativeElement.children[0];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(qt));
            }),
            (e.ɵcmp = ze({
              type: e,
              selectors: [["p-card"]],
              contentQueries: function (n, r, i) {
                if (
                  (1 & n && (yr(i, ek, 5), yr(i, tk, 5), yr(i, Ol, 4)), 2 & n)
                ) {
                  let s;
                  zn((s = Wn())) && (r.headerFacet = s.first),
                    zn((s = Wn())) && (r.footerFacet = s.first),
                    zn((s = Wn())) && (r.templates = s);
                }
              },
              hostAttrs: [1, "p-element"],
              inputs: {
                header: "header",
                subheader: "subheader",
                style: "style",
                styleClass: "styleClass",
              },
              ngContentSelectors: fk,
              decls: 9,
              vars: 9,
              consts: [
                [3, "ngClass", "ngStyle"],
                ["class", "p-card-header", 4, "ngIf"],
                [1, "p-card-body"],
                ["class", "p-card-title", 4, "ngIf"],
                ["class", "p-card-subtitle", 4, "ngIf"],
                [1, "p-card-content"],
                [4, "ngTemplateOutlet"],
                ["class", "p-card-footer", 4, "ngIf"],
                [1, "p-card-header"],
                [1, "p-card-title"],
                [1, "p-card-subtitle"],
                [1, "p-card-footer"],
              ],
              template: function (n, r) {
                1 & n &&
                  (gs(dk),
                  M(0, "div", 0),
                  ae(1, rk, 3, 1, "div", 1),
                  M(2, "div", 2),
                  ae(3, sk, 3, 2, "div", 3),
                  ae(4, ak, 3, 2, "div", 4),
                  M(5, "div", 5),
                  pr(6),
                  ae(7, lk, 1, 0, "ng-container", 6),
                  P(),
                  ae(8, ck, 3, 1, "div", 7),
                  P()()),
                  2 & n &&
                    (ca(r.styleClass),
                    Z("ngClass", "p-card p-component")("ngStyle", r.style),
                    ie(1),
                    Z("ngIf", r.headerFacet || r.headerTemplate),
                    ie(2),
                    Z("ngIf", r.header || r.titleTemplate),
                    ie(1),
                    Z("ngIf", r.subheader || r.subtitleTemplate),
                    ie(3),
                    Z("ngTemplateOutlet", r.contentTemplate),
                    ie(1),
                    Z("ngIf", r.footerFacet || r.footerTemplate));
              },
              dependencies: [Ba, $a, Od, Pd],
              styles: [".p-card-header img{width:100%}\n"],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })(),
        hk = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ imports: [Kn, ow] })),
            e
          );
        })();
      function pk(e, t) {
        1 & e && cn(0);
      }
      function gk(e, t) {
        1 & e && cn(0);
      }
      const eh = function (e) {
        return { $implicit: e };
      };
      function mk(e, t) {
        if (
          (1 & e && (aa(0), ae(1, gk, 1, 0, "ng-container", 4), la()), 2 & e)
        ) {
          const n = Dt().$implicit,
            r = Dt();
          ie(1),
            Z("ngTemplateOutlet", r.markerTemplate)(
              "ngTemplateOutletContext",
              ya(2, eh, n)
            );
        }
      }
      function yk(e, t) {
        1 & e && he(0, "div", 10);
      }
      function vk(e, t) {
        1 & e && he(0, "div", 11);
      }
      function _k(e, t) {
        1 & e && cn(0);
      }
      function Dk(e, t) {
        if (
          (1 & e &&
            (M(0, "div", 2)(1, "div", 3),
            ae(2, pk, 1, 0, "ng-container", 4),
            P(),
            M(3, "div", 5),
            ae(4, mk, 2, 4, "ng-container", 6),
            ae(5, yk, 1, 0, "ng-template", null, 7, cv),
            ae(7, vk, 1, 0, "div", 8),
            P(),
            M(8, "div", 9),
            ae(9, _k, 1, 0, "ng-container", 4),
            P()()),
          2 & e)
        ) {
          const n = t.$implicit,
            r = t.last,
            i = (function gm(e) {
              return Br(
                (function DC() {
                  return B.lFrame.contextLView;
                })(),
                22 + e
              );
            })(6),
            s = Dt();
          ie(2),
            Z("ngTemplateOutlet", s.oppositeTemplate)(
              "ngTemplateOutletContext",
              ya(7, eh, n)
            ),
            ie(2),
            Z("ngIf", s.markerTemplate)("ngIfElse", i),
            ie(3),
            Z("ngIf", !r),
            ie(2),
            Z("ngTemplateOutlet", s.contentTemplate)(
              "ngTemplateOutletContext",
              ya(9, eh, n)
            );
        }
      }
      const Ek = function (e, t, n, r, i, s, o) {
        return {
          "p-timeline p-component": !0,
          "p-timeline-left": e,
          "p-timeline-right": t,
          "p-timeline-top": n,
          "p-timeline-bottom": r,
          "p-timeline-alternate": i,
          "p-timeline-vertical": s,
          "p-timeline-horizontal": o,
        };
      };
      let wk = (() => {
          class e {
            constructor(n) {
              (this.el = n), (this.align = "left"), (this.layout = "vertical");
            }
            getBlockableElement() {
              return this.el.nativeElement.children[0];
            }
            ngAfterContentInit() {
              this.templates.forEach((n) => {
                switch (n.getType()) {
                  case "content":
                    this.contentTemplate = n.template;
                    break;
                  case "opposite":
                    this.oppositeTemplate = n.template;
                    break;
                  case "marker":
                    this.markerTemplate = n.template;
                }
              });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(qt));
            }),
            (e.ɵcmp = ze({
              type: e,
              selectors: [["p-timeline"]],
              contentQueries: function (n, r, i) {
                if ((1 & n && yr(i, Ol, 4), 2 & n)) {
                  let s;
                  zn((s = Wn())) && (r.templates = s);
                }
              },
              hostAttrs: [1, "p-element"],
              inputs: {
                value: "value",
                style: "style",
                styleClass: "styleClass",
                align: "align",
                layout: "layout",
              },
              decls: 2,
              vars: 13,
              consts: [
                [3, "ngStyle", "ngClass"],
                ["class", "p-timeline-event", 4, "ngFor", "ngForOf"],
                [1, "p-timeline-event"],
                [1, "p-timeline-event-opposite"],
                [4, "ngTemplateOutlet", "ngTemplateOutletContext"],
                [1, "p-timeline-event-separator"],
                [4, "ngIf", "ngIfElse"],
                ["marker", ""],
                ["class", "p-timeline-event-connector", 4, "ngIf"],
                [1, "p-timeline-event-content"],
                [1, "p-timeline-event-marker"],
                [1, "p-timeline-event-connector"],
              ],
              template: function (n, r) {
                1 & n && (M(0, "div", 0), ae(1, Dk, 10, 11, "div", 1), P()),
                  2 & n &&
                    (ca(r.styleClass),
                    Z("ngStyle", r.style)(
                      "ngClass",
                      qy(
                        5,
                        Ek,
                        "left" === r.align,
                        "right" === r.align,
                        "top" === r.align,
                        "bottom" === r.align,
                        "alternate" === r.align,
                        "vertical" === r.layout,
                        "horizontal" === r.layout
                      )
                    ),
                    ie(1),
                    Z("ngForOf", r.value));
              },
              dependencies: [Ba, ja, $a, Od, Pd],
              styles: [
                ".p-timeline{display:flex;flex-grow:1;flex-direction:column}.p-timeline-left .p-timeline-event-opposite{text-align:right}.p-timeline-left .p-timeline-event-content{text-align:left}.p-timeline-right .p-timeline-event{flex-direction:row-reverse}.p-timeline-right .p-timeline-event-opposite{text-align:left}.p-timeline-right .p-timeline-event-content{text-align:right}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even){flex-direction:row-reverse}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite{text-align:right}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content{text-align:left}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-opposite{text-align:left}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content{text-align:right}.p-timeline-event{display:flex;position:relative;min-height:70px}.p-timeline-event:last-child{min-height:0}.p-timeline-event-opposite,.p-timeline-event-content{flex:1;padding:0 1rem}.p-timeline-event-separator{flex:0;display:flex;align-items:center;flex-direction:column}.p-timeline-event-marker{display:flex;align-self:baseline}.p-timeline-event-connector{flex-grow:1}.p-timeline-horizontal{flex-direction:row}.p-timeline-horizontal .p-timeline-event{flex-direction:column;flex:1}.p-timeline-horizontal .p-timeline-event:last-child{flex:0}.p-timeline-horizontal .p-timeline-event-separator{flex-direction:row}.p-timeline-horizontal .p-timeline-event-connector{width:100%}.p-timeline-bottom .p-timeline-event{flex-direction:column-reverse}.p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(even){flex-direction:column-reverse}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })(),
        Ck = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ imports: [Kn, ow] })),
            e
          );
        })();
      function bk(e, t) {
        if ((1 & e && (M(0, "span"), he(1, "i", 6), P()), 2 & e)) {
          const n = t.$implicit;
          ie(1), mi("color", n.color), Z("ngClass", n.icon);
        }
      }
      function Sk(e, t) {
        if ((1 & e && (M(0, "a", 10), he(1, "img", 11), P()), 2 & e)) {
          const n = Dt().$implicit;
          Z("href", n.url, as), ie(1), Z("alt", n.company)("src", n.image, as);
        }
      }
      function Tk(e, t) {
        if (
          (1 & e &&
            (M(0, "p-card", 7),
            ae(1, Sk, 2, 3, "ng-template", 8),
            M(2, "p", 9),
            ge(3),
            P()()),
          2 & e)
        ) {
          const n = t.$implicit;
          Z("header", n.company)("subheader", n.date), ie(3), kc(n.description);
        }
      }
      let Ik = (() => {
        class e {
          constructor() {
            this.events = [];
          }
          ngOnInit() {
            this.events = [
              {
                company: "Mercury",
                url: "https://www.mercury.co.nz",
                date: "August 2021 - Present",
                icon: Pl.CIRCLE,
                image: "assets/images/mercury.svg",
                color: "#85929e",
                description:
                  "I am currently working as a Solution Architect in the Digital workstream. I collaborate closely with our Enterprise Solution Architects and Software Developers to ensure that our enterprise solutions adhere to the best design, integration, security, and scalability patterns. This enables us to deliver high-quality web and mobile applications to our customers.",
              },
              {
                company: "Vivo (Telefonica Brazil)",
                url: "https://www.vivo.com.br",
                location: "Sao Paulo (Brazil)",
                date: "April 2020 - May 2021",
                icon: Pl.CIRCLE,
                image: "assets/images/vivo.svg",
                color: "#85929e",
                description:
                  "I worked as a Cloud and DevOps Manager at Vivo, aiding in the establishment of Vivo's DevOps framework to bolster CI/CD pipelines for ICT teams. Additionally, I contributed to defining Vivo's enterprise cloud strategy for the upcoming years, aligning with the Telefonica-Microsoft agreement to facilitate the migration of on-premise resources to Microsoft Azure.",
              },
              {
                company: "Accenture New Zealand",
                date: "July 2016 - March 2020",
                url: "https://www.accenture.com/nz-en/about/company/new-zealand",
                icon: Pl.CIRCLE,
                image: "assets/images/accenture.svg",
                color: "#85929e",
                description:
                  "During my 3-year tenure with Accenture New Zealand, I was involved in numerous projects aimed at supporting Accenture's clients, primarily in the Health and Public sectors across New Zealand. These projects encompassed various roles, each with distinct focuses, such as Solution Architecture, Integration, Testing, and DevOps.",
              },
              {
                company: "Accenture Brazil",
                date: "March 2007 - July 2016",
                url: "https://www.accenture.com/br-pt",
                icon: Pl.CIRCLE,
                image: "assets/images/accenture.svg",
                color: "#85929e",
                description:
                  "I began my career as a Test Analyst in 2007, transitioning to Software Development and Integration a few years later. After accumulating 9 years of experience working with various clients and projects across multiple locations within the LATAM region, I received an opportunity to relocate to New Zealand. This relocation allowed me to participate in a significant business transformation project for a government agency in Wellington.",
              },
            ];
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = ze({
            type: e,
            selectors: [["app-experience"]],
            decls: 8,
            vars: 1,
            consts: [
              ["id", "experience", 1, "flex-container-header"],
              [1, "pi", "pi-briefcase", 2, "font-size", "24px"],
              [1, "flex-container-experience-box"],
              ["align", "alternate", 3, "value"],
              ["pTemplate", "marker"],
              ["pTemplate", "content"],
              [3, "ngClass"],
              [
                "styleClass",
                "p-card-shadow",
                2,
                "width",
                "48%",
                3,
                "header",
                "subheader",
              ],
              ["pTemplate", "header"],
              [2, "text-align", "left"],
              [3, "href"],
              [
                2,
                "width",
                "25%",
                "margin-left",
                "1%",
                "margin-right",
                "1%",
                "margin-top",
                "2%",
                3,
                "alt",
                "src",
              ],
            ],
            template: function (n, r) {
              1 & n &&
                (M(0, "div", 0),
                he(1, "i", 1),
                M(2, "h3"),
                ge(3, "EXPERIENCE"),
                P()(),
                M(4, "div", 2)(5, "p-timeline", 3),
                ae(6, bk, 2, 3, "ng-template", 4),
                ae(7, Tk, 4, 3, "ng-template", 5),
                P()()),
                2 & n && (ie(5), Z("value", r.events));
            },
            dependencies: [Ba, Jf, Ol, wk],
            styles: [
              ".flex-container-experience-box[_ngcontent-%COMP%]{width:100%;padding:30px 150px;background-color:#ebedef}",
            ],
          })),
          e
        );
      })();
      function Mk(e, t) {
        1 & e && (M(0, "a", 6), he(1, "img", 7), P());
      }
      const Ak = function () {
        return { width: "48%", "margin-left": "auto", "margin-right": "auto" };
      };
      let Rk = (() => {
        class e {
          constructor() {}
          ngOnInit() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = ze({
            type: e,
            selectors: [["app-education"]],
            decls: 10,
            vars: 3,
            consts: [
              ["id", "education", 1, "flex-container-header"],
              [1, "pi", "pi-book", 2, "font-size", "24px"],
              [1, "spacing"],
              [1, "flex-container-education-box"],
              [
                "header",
                "Santa Cecilia University",
                "subheader",
                "Bachelor of Computer Science",
                "styleClass",
                "p-card-shadow",
              ],
              ["pTemplate", "header"],
              ["href", "https://unisanta.br"],
              [
                "alt",
                "Santa Cecilia University (2003-2007)",
                "src",
                "assets/images/university.png",
                2,
                "width",
                "15%",
              ],
            ],
            template: function (n, r) {
              1 & n &&
                (M(0, "div", 0),
                he(1, "i", 1),
                M(2, "h3"),
                ge(3, "EDUCATION"),
                P()(),
                he(4, "div", 2),
                M(5, "div", 3)(6, "p-card", 4),
                ae(7, Mk, 2, 0, "ng-template", 5),
                M(8, "p"),
                ge(
                  9,
                  " Relevant Modules: Algorithmics, Systems Programming, Professional Software Development, Advanced Networks and Operating Systems "
                ),
                P()()()),
                2 & n && (ie(6), Pt(Gc(2, Ak)));
            },
            dependencies: [Jf, Ol],
            styles: [
              ".flex-container-education-box[_ngcontent-%COMP%]{padding-top:30px;padding-bottom:30px;margin-left:auto;margin-right:auto;display:flex;flex-direction:row;align-items:center;justify-content:center;background-color:#ebedef}",
            ],
          })),
          e
        );
      })();
      function Nk(e, t) {
        1 & e && he(0, "i", 6);
      }
      const xk = function () {
        return { "text-align": "center" };
      };
      function Pk(e, t) {
        if (
          (1 & e && (M(0, "p-card", 4), ae(1, Nk, 1, 0, "i", 5), P()), 2 & e)
        ) {
          const n = t.$implicit,
            r = Dt();
          Pt(Gc(5, xk)),
            Z("header", n.name)("subheader", n.description),
            ie(1),
            Z("ngForOf", r.starsArray(n.stars));
        }
      }
      let Ok = (() => {
          class e {
            constructor() {
              (this.skills = []), (this.stars = []);
            }
            ngOnInit() {
              this.skills = [
                {
                  name: "Back-End",
                  description:
                    "AWS Lambda, Azure Functions, Node.js, Python, Typescript, C#",
                  stars: 3,
                },
                { name: "Cloud", description: "AWS, Azure", stars: 4 },
                {
                  name: "Databases",
                  description: "Oracle, SQL Server, MongoDB, PostgreSQL",
                  stars: 5,
                },
                {
                  name: "DevOps",
                  description:
                    "Azure DevOps, Bitbucket, Bamboo, CircleCI, GitLab, GitHub",
                  stars: 5,
                },
                {
                  name: "Front-End",
                  description: "Angular, CSS, Cypress, HTML, TypeScript, React",
                  stars: 3,
                },
                {
                  name: "Project Management",
                  description: "Confluence, JIRA, LucidCharts, Miro",
                  stars: 3,
                },
                {
                  name: "Tools",
                  description: "Docker, NPM, VSCode, Yarn",
                  stars: 3,
                },
              ];
            }
            starsArray(n) {
              return (this.stars = new Array(n));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = ze({
              type: e,
              selectors: [["app-skills"]],
              decls: 6,
              vars: 1,
              consts: [
                ["id", "skills", 1, "flex-container-header"],
                [1, "pi", "pi-star", 2, "font-size", "24px"],
                [1, "flex-container-skills-box"],
                [3, "header", "subheader", "style", 4, "ngFor", "ngForOf"],
                [3, "header", "subheader"],
                [
                  "class",
                  "pi pi-star-fill",
                  "style",
                  "color: black; margin: 2px; font-size: 20px",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                [
                  1,
                  "pi",
                  "pi-star-fill",
                  2,
                  "color",
                  "black",
                  "margin",
                  "2px",
                  "font-size",
                  "20px",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (M(0, "div", 0),
                  he(1, "i", 1),
                  M(2, "h3"),
                  ge(3, "SKILLS"),
                  P()(),
                  M(4, "div", 2),
                  ae(5, Pk, 2, 6, "p-card", 3),
                  P()),
                  2 & n && (ie(5), Z("ngForOf", r.skills));
              },
              dependencies: [ja, Jf],
              styles: [
                ".flex-container-skills-box[_ngcontent-%COMP%]{padding-top:20px;padding-bottom:20px;width:100%;display:flex;flex-direction:row;flex-wrap:wrap;background-color:#ebedef;align-items:center;justify-content:center}p-card[_ngcontent-%COMP%]{width:250px;margin:15px}",
              ],
            })),
            e
          );
        })(),
        Fk = (() => {
          class e {
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = ze({
              type: e,
              selectors: [["app-contact"]],
              decls: 4,
              vars: 0,
              consts: [
                ["id", "education", 1, "flex-container-header"],
                [1, "pi", "pi-envelope", 2, "font-size", "24px"],
              ],
              template: function (n, r) {
                1 & n &&
                  (M(0, "div", 0),
                  he(1, "i", 1),
                  M(2, "h3"),
                  ge(3, "CONTACT"),
                  P()());
              },
              styles: [
                ".flex-container-contact-box[_ngcontent-%COMP%]{display:flex;width:50%;font-size:24px}",
              ],
            })),
            e
          );
        })(),
        Lk = (() => {
          class e {
            constructor(n) {
              this.spinner = n;
            }
            ngOnInit() {
              this.spinner.show(),
                setTimeout(() => {
                  this.spinner.hide();
                }, 2e3);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(rw));
            }),
            (e.ɵcmp = ze({
              type: e,
              selectors: [["app-root"]],
              decls: 11,
              vars: 1,
              consts: [
                [
                  "bdColor",
                  "rgba(0, 0, 0, 0.8)",
                  "size",
                  "medium",
                  "color",
                  "#fff",
                  "type",
                  "square-jelly-box",
                  3,
                  "fullScreen",
                ],
                [2, "color", "white"],
                ["id", "main"],
              ],
              template: function (n, r) {
                1 & n &&
                  (M(0, "ngx-spinner", 0)(1, "p", 1),
                  ge(2, "Loading..."),
                  P()(),
                  he(3, "app-header")(4, "app-main-page"),
                  M(5, "section", 2),
                  he(6, "app-experience")(7, "app-education"),
                  P(),
                  he(8, "app-skills")(9, "app-contact")(10, "app-footer")),
                  2 & n && Z("fullScreen", !0);
              },
              dependencies: [QL, ZL, XL, JL, Ik, Rk, Ok, Fk],
            })),
            e
          );
        })(),
        kk = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ imports: [Kn] })),
            e
          );
        })(),
        Bk = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ imports: [Kn, kk] })),
            e
          );
        })(),
        jk = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ imports: [Kn] })),
            e
          );
        })(),
        $k = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e, bootstrap: [Lk] })),
            (e.ɵinj = He({
              imports: [
                K_,
                LO,
                kL,
                hk,
                Bk,
                Ck,
                YL.forRoot({ type: "square-jelly-box" }),
                jk,
              ],
            })),
            e
          );
        })();
      (function UA() {
        Yv = !1;
      })(),
        Sx()
          .bootstrapModule($k)
          .catch((e) => console.error(e));
    },
  },
  (nr) => {
    nr((nr.s = 29));
  },
]);
