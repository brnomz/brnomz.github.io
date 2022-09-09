"use strict";
(self.webpackChunkmy_digital_cv = self.webpackChunkmy_digital_cv || []).push([
  [179],
  {
    29: () => {
      function nr(e) {
        return "function" == typeof e;
      }
      let Li = !1;
      const Tt = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(e) {
          if (e) {
            const t = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                t.stack
            );
          } else
            Li &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          Li = e;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return Li;
        },
      };
      function On(e) {
        setTimeout(() => {
          throw e;
        }, 0);
      }
      const no = {
          closed: !0,
          next(e) {},
          error(e) {
            if (Tt.useDeprecatedSynchronousErrorHandling) throw e;
            On(e);
          },
          complete() {},
        },
        rh = Array.isArray || ((e) => e && "number" == typeof e.length);
      function ih(e) {
        return null !== e && "object" == typeof e;
      }
      const ro = (() => {
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
      class _e {
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
            n instanceof _e)
          )
            n.remove(this);
          else if (null !== n)
            for (let o = 0; o < n.length; ++o) n[o].remove(this);
          if (nr(i)) {
            r && (this._unsubscribe = void 0);
            try {
              i.call(this);
            } catch (o) {
              t = o instanceof ro ? sh(o.errors) : [o];
            }
          }
          if (rh(s)) {
            let o = -1,
              a = s.length;
            for (; ++o < a; ) {
              const l = s[o];
              if (ih(l))
                try {
                  l.unsubscribe();
                } catch (u) {
                  (t = t || []),
                    u instanceof ro ? (t = t.concat(sh(u.errors))) : t.push(u);
                }
            }
          }
          if (t) throw new ro(t);
        }
        add(t) {
          let n = t;
          if (!t) return _e.EMPTY;
          switch (typeof t) {
            case "function":
              n = new _e(t);
            case "object":
              if (n === this || n.closed || "function" != typeof n.unsubscribe)
                return n;
              if (this.closed) return n.unsubscribe(), n;
              if (!(n instanceof _e)) {
                const s = n;
                (n = new _e()), (n._subscriptions = [s]);
              }
              break;
            default:
              throw new Error(
                "unrecognized teardown " + t + " added to Subscription."
              );
          }
          let { _parentOrParents: r } = n;
          if (null === r) n._parentOrParents = this;
          else if (r instanceof _e) {
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
      function sh(e) {
        return e.reduce((t, n) => t.concat(n instanceof ro ? n.errors : n), []);
      }
      _e.EMPTY = (((e = new _e()).closed = !0), e);
      const io =
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random();
      class he extends _e {
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
              this.destination = no;
              break;
            case 1:
              if (!t) {
                this.destination = no;
                break;
              }
              if ("object" == typeof t) {
                t instanceof he
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new oh(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new oh(this, t, n, r));
          }
        }
        [io]() {
          return this;
        }
        static create(t, n, r) {
          const i = new he(t, n, r);
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
      class oh extends he {
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
              n !== no &&
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
            Tt.useDeprecatedSynchronousErrorHandling && n.syncErrorThrowable
              ? this.__tryOrSetError(n, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: n } = this,
              { useDeprecatedSynchronousErrorHandling: r } = Tt;
            if (this._error)
              r && n.syncErrorThrowable
                ? (this.__tryOrSetError(n, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (n.syncErrorThrowable)
              r ? ((n.syncErrorValue = t), (n.syncErrorThrown = !0)) : On(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), r)) throw t;
              On(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const n = () => this._complete.call(this._context);
              Tt.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, n), this.unsubscribe())
                : (this.__tryOrUnsub(n), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, n) {
          try {
            t.call(this._context, n);
          } catch (r) {
            if ((this.unsubscribe(), Tt.useDeprecatedSynchronousErrorHandling))
              throw r;
            On(r);
          }
        }
        __tryOrSetError(t, n, r) {
          if (!Tt.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            n.call(this._context, r);
          } catch (i) {
            return Tt.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = i), (t.syncErrorThrown = !0), !0)
              : (On(i), !0);
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
      const ki =
        ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function so(e) {
        return e;
      }
      function ah(e) {
        return 0 === e.length
          ? so
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, i) => i(r), n);
            };
      }
      let Ee = (() => {
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
              o = (function dE(e, t, n) {
                if (e) {
                  if (e instanceof he) return e;
                  if (e[io]) return e[io]();
                }
                return e || t || n ? new he(e, t, n) : new he(no);
              })(n, r, i);
            if (
              (o.add(
                s
                  ? s.call(o, this.source)
                  : this.source ||
                    (Tt.useDeprecatedSynchronousErrorHandling &&
                      !o.syncErrorThrowable)
                  ? this._subscribe(o)
                  : this._trySubscribe(o)
              ),
              Tt.useDeprecatedSynchronousErrorHandling &&
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
              Tt.useDeprecatedSynchronousErrorHandling &&
                ((n.syncErrorThrown = !0), (n.syncErrorValue = r)),
                (function cE(e) {
                  for (; e; ) {
                    const { closed: t, destination: n, isStopped: r } = e;
                    if (t || r) return !1;
                    e = n && n instanceof he ? n : null;
                  }
                  return !0;
                })(n)
                  ? n.error(r)
                  : console.warn(r);
            }
          }
          forEach(n, r) {
            return new (r = lh(r))((i, s) => {
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
          [ki]() {
            return this;
          }
          pipe(...n) {
            return 0 === n.length ? this : ah(n)(this);
          }
          toPromise(n) {
            return new (n = lh(n))((r, i) => {
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
      function lh(e) {
        if ((e || (e = Tt.Promise || Promise), !e))
          throw new Error("no Promise impl found");
        return e;
      }
      const Nr = (() => {
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
      class hE extends _e {
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
      class uh extends he {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let $t = (() => {
        class e extends Ee {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [io]() {
            return new uh(this);
          }
          lift(n) {
            const r = new ch(this, this);
            return (r.operator = n), r;
          }
          next(n) {
            if (this.closed) throw new Nr();
            if (!this.isStopped) {
              const { observers: r } = this,
                i = r.length,
                s = r.slice();
              for (let o = 0; o < i; o++) s[o].next(n);
            }
          }
          error(n) {
            if (this.closed) throw new Nr();
            (this.hasError = !0), (this.thrownError = n), (this.isStopped = !0);
            const { observers: r } = this,
              i = r.length,
              s = r.slice();
            for (let o = 0; o < i; o++) s[o].error(n);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new Nr();
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
            if (this.closed) throw new Nr();
            return super._trySubscribe(n);
          }
          _subscribe(n) {
            if (this.closed) throw new Nr();
            return this.hasError
              ? (n.error(this.thrownError), _e.EMPTY)
              : this.isStopped
              ? (n.complete(), _e.EMPTY)
              : (this.observers.push(n), new hE(this, n));
          }
          asObservable() {
            const n = new Ee();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new ch(t, n)), e;
      })();
      class ch extends $t {
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
          return n ? this.source.subscribe(t) : _e.EMPTY;
        }
      }
      function oo(e) {
        return e && "function" == typeof e.schedule;
      }
      function X(e, t) {
        return function (r) {
          if ("function" != typeof e)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return r.lift(new pE(e, t));
        };
      }
      class pE {
        constructor(t, n) {
          (this.project = t), (this.thisArg = n);
        }
        call(t, n) {
          return n.subscribe(new gE(t, this.project, this.thisArg));
        }
      }
      class gE extends he {
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
      const dh = (e) => (t) => {
          for (let n = 0, r = e.length; n < r && !t.closed; n++) t.next(e[n]);
          t.complete();
        },
        ao = (function yE() {
          return "function" == typeof Symbol && Symbol.iterator
            ? Symbol.iterator
            : "@@iterator";
        })(),
        fh = (e) => e && "number" == typeof e.length && "function" != typeof e;
      function hh(e) {
        return (
          !!e && "function" != typeof e.subscribe && "function" == typeof e.then
        );
      }
      const Ll = (e) => {
        if (e && "function" == typeof e[ki])
          return ((e) => (t) => {
            const n = e[ki]();
            if ("function" != typeof n.subscribe)
              throw new TypeError(
                "Provided object does not correctly implement Symbol.observable"
              );
            return n.subscribe(t);
          })(e);
        if (fh(e)) return dh(e);
        if (hh(e))
          return ((e) => (t) => (
            e
              .then(
                (n) => {
                  t.closed || (t.next(n), t.complete());
                },
                (n) => t.error(n)
              )
              .then(null, On),
            t
          ))(e);
        if (e && "function" == typeof e[ao])
          return ((e) => (t) => {
            const n = e[ao]();
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
            ih(e) ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`;
          throw new TypeError(n);
        }
      };
      function kl(e, t) {
        return new Ee((n) => {
          const r = new _e();
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
      function ke(e, t) {
        return t
          ? (function SE(e, t) {
              if (null != e) {
                if (
                  (function CE(e) {
                    return e && "function" == typeof e[ki];
                  })(e)
                )
                  return (function DE(e, t) {
                    return new Ee((n) => {
                      const r = new _e();
                      return (
                        r.add(
                          t.schedule(() => {
                            const i = e[ki]();
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
                if (hh(e))
                  return (function wE(e, t) {
                    return new Ee((n) => {
                      const r = new _e();
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
                if (fh(e)) return kl(e, t);
                if (
                  (function bE(e) {
                    return e && "function" == typeof e[ao];
                  })(e) ||
                  "string" == typeof e
                )
                  return (function EE(e, t) {
                    if (!e) throw new Error("Iterable cannot be null");
                    return new Ee((n) => {
                      const r = new _e();
                      let i;
                      return (
                        r.add(() => {
                          i && "function" == typeof i.return && i.return();
                        }),
                        r.add(
                          t.schedule(() => {
                            (i = e[ao]()),
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
          : e instanceof Ee
          ? e
          : new Ee(Ll(e));
      }
      class lo extends he {
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
      class uo extends he {
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
      function co(e, t) {
        if (t.closed) return;
        if (e instanceof Ee) return e.subscribe(t);
        let n;
        try {
          n = Ll(e)(t);
        } catch (r) {
          t.error(r);
        }
        return n;
      }
      function $e(e, t, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof t
          ? (r) =>
              r.pipe(
                $e((i, s) => ke(e(i, s)).pipe(X((o, a) => t(i, o, s, a))), n)
              )
          : ("number" == typeof t && (n = t), (r) => r.lift(new TE(e, n)));
      }
      class TE {
        constructor(t, n = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = n);
        }
        call(t, n) {
          return n.subscribe(new IE(t, this.project, this.concurrent));
        }
      }
      class IE extends uo {
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
          const n = new lo(this),
            r = this.destination;
          r.add(n);
          const i = co(t, n);
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
      function xr(e = Number.POSITIVE_INFINITY) {
        return $e(so, e);
      }
      function Vl(e, t) {
        return t ? kl(e, t) : new Ee(dh(e));
      }
      function fo() {
        return function (t) {
          return t.lift(new AE(t));
        };
      }
      class AE {
        constructor(t) {
          this.connectable = t;
        }
        call(t, n) {
          const { connectable: r } = this;
          r._refCount++;
          const i = new RE(t, r),
            s = n.subscribe(i);
          return i.closed || (i.connection = r.connect()), s;
        }
      }
      class RE extends he {
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
      class jl extends Ee {
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
              (t = this._connection = new _e()),
              t.add(this.source.subscribe(new xE(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = _e.EMPTY))),
            t
          );
        }
        refCount() {
          return fo()(this);
        }
      }
      const NE = (() => {
        const e = jl.prototype;
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
      class xE extends uh {
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
      class FE {
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
      function LE() {
        return new $t();
      }
      function oe(e) {
        for (let t in e) if (e[t] === oe) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function ae(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(ae).join(", ") + "]";
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
      const VE = oe({ __forward_ref__: oe });
      function Hl(e) {
        return (
          (e.__forward_ref__ = Hl),
          (e.toString = function () {
            return ae(this());
          }),
          e
        );
      }
      function L(e) {
        return (function Ul(e) {
          return (
            "function" == typeof e &&
            e.hasOwnProperty(VE) &&
            e.__forward_ref__ === Hl
          );
        })(e)
          ? e()
          : e;
      }
      class D extends Error {
        constructor(t, n) {
          super(
            (function ho(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function $(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function po(e, t) {
        throw new D(-201, !1);
      }
      function dt(e, t) {
        null == e &&
          (function re(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function k(e) {
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
      function go(e) {
        return ph(e, mo) || ph(e, mh);
      }
      function ph(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function gh(e) {
        return e && (e.hasOwnProperty(zl) || e.hasOwnProperty(qE))
          ? e[zl]
          : null;
      }
      const mo = oe({ ɵprov: oe }),
        zl = oe({ ɵinj: oe }),
        mh = oe({ ngInjectableDef: oe }),
        qE = oe({ ngInjectorDef: oe });
      var P = (() => (
        ((P = P || {})[(P.Default = 0)] = "Default"),
        (P[(P.Host = 1)] = "Host"),
        (P[(P.Self = 2)] = "Self"),
        (P[(P.SkipSelf = 4)] = "SkipSelf"),
        (P[(P.Optional = 8)] = "Optional"),
        P
      ))();
      let Wl;
      function It(e) {
        const t = Wl;
        return (Wl = e), t;
      }
      function yh(e, t, n) {
        const r = go(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & P.Optional
          ? null
          : void 0 !== t
          ? t
          : void po(ae(e));
      }
      function Fn(e) {
        return { toString: e }.toString();
      }
      var Ht = (() => (
          ((Ht = Ht || {})[(Ht.OnPush = 0)] = "OnPush"),
          (Ht[(Ht.Default = 1)] = "Default"),
          Ht
        ))(),
        Ut = (() => (
          (function (e) {
            (e[(e.Emulated = 0)] = "Emulated"),
              (e[(e.None = 2)] = "None"),
              (e[(e.ShadowDom = 3)] = "ShadowDom");
          })(Ut || (Ut = {})),
          Ut
        ))();
      const le = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Pr = {},
        ne = [],
        yo = oe({ ɵcmp: oe }),
        Gl = oe({ ɵdir: oe }),
        ql = oe({ ɵpipe: oe }),
        vh = oe({ ɵmod: oe }),
        vn = oe({ ɵfac: oe }),
        Vi = oe({ __NG_ELEMENT_ID__: oe });
      let QE = 0;
      function Ue(e) {
        return Fn(() => {
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
              onPush: e.changeDetection === Ht.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: n,
              dependencies: (n && e.dependencies) || null,
              getStandaloneInjector: null,
              selectors: e.selectors || ne,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || Ut.Emulated,
              id: "c" + QE++,
              styles: e.styles || ne,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            s = e.dependencies,
            o = e.features;
          return (
            (i.inputs = wh(e.inputs, r)),
            (i.outputs = wh(e.outputs)),
            o && o.forEach((a) => a(i)),
            (i.directiveDefs = s
              ? () => ("function" == typeof s ? s() : s).map(_h).filter(Dh)
              : null),
            (i.pipeDefs = s
              ? () => ("function" == typeof s ? s() : s).map(et).filter(Dh)
              : null),
            i
          );
        });
      }
      function _h(e) {
        return ie(e) || Xe(e);
      }
      function Dh(e) {
        return null !== e;
      }
      function Ze(e) {
        return Fn(() => ({
          type: e.type,
          bootstrap: e.bootstrap || ne,
          declarations: e.declarations || ne,
          imports: e.imports || ne,
          exports: e.exports || ne,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function wh(e, t) {
        if (null == e) return Pr;
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
      const Ve = Ue;
      function Je(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function ie(e) {
        return e[yo] || null;
      }
      function Xe(e) {
        return e[Gl] || null;
      }
      function et(e) {
        return e[ql] || null;
      }
      function ft(e, t) {
        const n = e[vh] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${ae(e)} does not have '\u0275mod' property.`);
        return n;
      }
      const W = 11;
      function at(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function Wt(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function Yl(e) {
        return 0 != (8 & e.flags);
      }
      function wo(e) {
        return 2 == (2 & e.flags);
      }
      function Eo(e) {
        return 1 == (1 & e.flags);
      }
      function Gt(e) {
        return null !== e.template;
      }
      function tC(e) {
        return 0 != (256 & e[2]);
      }
      function ar(e, t) {
        return e.hasOwnProperty(vn) ? e[vn] : null;
      }
      class iC {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ln() {
        return bh;
      }
      function bh(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = oC), sC;
      }
      function sC() {
        const e = Th(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === Pr) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function oC(e, t, n, r) {
        const i =
            Th(e) ||
            (function aC(e, t) {
              return (e[Sh] = t);
            })(e, { previous: Pr, current: null }),
          s = i.current || (i.current = {}),
          o = i.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (s[a] = new iC(l && l.currentValue, t, o === Pr)), (e[r] = t);
      }
      Ln.ngInherit = !0;
      const Sh = "__ngSimpleChanges__";
      function Th(e) {
        return e[Sh] || null;
      }
      function Ie(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function Co(e, t) {
        return Ie(t[e]);
      }
      function Rt(e, t) {
        return Ie(t[e.index]);
      }
      function tu(e, t) {
        return e.data[t];
      }
      function jr(e, t) {
        return e[t];
      }
      function pt(e, t) {
        const n = t[e];
        return at(n) ? n : n[0];
      }
      function Ih(e) {
        return 4 == (4 & e[2]);
      }
      function bo(e) {
        return 64 == (64 & e[2]);
      }
      function kn(e, t) {
        return null == t ? null : e[t];
      }
      function Mh(e) {
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
      const B = { lFrame: kh(null), bindingsEnabled: !0 };
      function Rh() {
        return B.bindingsEnabled;
      }
      function v() {
        return B.lFrame.lView;
      }
      function Y() {
        return B.lFrame.tView;
      }
      function Re() {
        let e = Nh();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Nh() {
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
      function Br() {
        return B.lFrame.bindingIndex++;
      }
      function Dn(e) {
        const t = B.lFrame,
          n = t.bindingIndex;
        return (t.bindingIndex = t.bindingIndex + e), n;
      }
      function CC(e, t) {
        const n = B.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), su(t);
      }
      function su(e) {
        B.lFrame.currentDirectiveIndex = e;
      }
      function Oh() {
        return B.lFrame.currentQueryIndex;
      }
      function au(e) {
        B.lFrame.currentQueryIndex = e;
      }
      function SC(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function Fh(e, t, n) {
        if (n & P.SkipSelf) {
          let i = t,
            s = e;
          for (
            ;
            !((i = i.parent),
            null !== i ||
              n & P.Host ||
              ((i = SC(s)), null === i || ((s = s[15]), 10 & i.type)));

          );
          if (null === i) return !1;
          (t = i), (e = s);
        }
        const r = (B.lFrame = Lh());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function lu(e) {
        const t = Lh(),
          n = e[1];
        (B.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Lh() {
        const e = B.lFrame,
          t = null === e ? null : e.child;
        return null === t ? kh(e) : t;
      }
      function kh(e) {
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
      function Vh() {
        const e = B.lFrame;
        return (
          (B.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const jh = Vh;
      function uu() {
        const e = Vh();
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
      function Vn(e) {
        B.lFrame.selectedIndex = e;
      }
      function To(e, t) {
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
      function Io(e, t, n) {
        Bh(e, t, 3, n);
      }
      function Mo(e, t, n, r) {
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
                (OC(e, n, t, l), (e[18] = (4294901760 & e[18]) + l + 2)),
              l++;
      }
      function OC(e, t, n, r) {
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
      function Ao(e, t, n) {
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
            Hh(s) ? e.setProperty(t, s, o) : e.setAttribute(t, s, o), r++;
          }
        }
        return r;
      }
      function $h(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Hh(e) {
        return 64 === e.charCodeAt(0);
      }
      function Ro(e, t) {
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
      function zh(e) {
        return -1 !== e;
      }
      function $r(e) {
        return 32767 & e;
      }
      function Hr(e, t) {
        let n = (function jC(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let fu = !0;
      function No(e) {
        const t = fu;
        return (fu = e), t;
      }
      let BC = 0;
      const on = {};
      function Wi(e, t) {
        const n = pu(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          hu(r.data, e),
          hu(t, null),
          hu(r.blueprint, null));
        const i = xo(e, t),
          s = e.injectorIndex;
        if (zh(i)) {
          const o = $r(i),
            a = Hr(i, t),
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
      function xo(e, t) {
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
      function Po(e, t, n) {
        !(function $C(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Vi) && (r = n[Vi]),
            null == r && (r = n[Vi] = BC++);
          const i = 255 & r;
          t.data[e + (i >> 5)] |= 1 << i;
        })(e, t, n);
      }
      function qh(e, t, n) {
        if (n & P.Optional) return e;
        po();
      }
      function Kh(e, t, n, r) {
        if (
          (n & P.Optional && void 0 === r && (r = null),
          0 == (n & (P.Self | P.Host)))
        ) {
          const i = e[9],
            s = It(void 0);
          try {
            return i ? i.get(t, r, n & P.Optional) : yh(t, r, n & P.Optional);
          } finally {
            It(s);
          }
        }
        return qh(r, 0, n);
      }
      function Qh(e, t, n, r = P.Default, i) {
        if (null !== e) {
          if (1024 & t[2]) {
            const o = (function qC(e, t, n, r, i) {
              let s = e,
                o = t;
              for (
                ;
                null !== s && null !== o && 1024 & o[2] && !(256 & o[2]);

              ) {
                const a = Yh(s, o, n, r | P.Self, on);
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
          const s = Yh(e, t, n, r, on);
          if (s !== on) return s;
        }
        return Kh(t, n, r, i);
      }
      function Yh(e, t, n, r, i) {
        const s = (function zC(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Vi) ? e[Vi] : void 0;
          return "number" == typeof t ? (t >= 0 ? 255 & t : WC) : t;
        })(n);
        if ("function" == typeof s) {
          if (!Fh(t, e, r)) return r & P.Host ? qh(i, 0, r) : Kh(t, n, r, i);
          try {
            const o = s(r);
            if (null != o || r & P.Optional) return o;
            po();
          } finally {
            jh();
          }
        } else if ("number" == typeof s) {
          let o = null,
            a = pu(e, t),
            l = -1,
            u = r & P.Host ? t[16][6] : null;
          for (
            (-1 === a || r & P.SkipSelf) &&
            ((l = -1 === a ? xo(e, t) : t[a + 8]),
            -1 !== l && Jh(r, !1)
              ? ((o = t[1]), (a = $r(l)), (t = Hr(l, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[1];
            if (Zh(s, a, c.data)) {
              const d = UC(a, t, n, o, r, u);
              if (d !== on) return d;
            }
            (l = t[a + 8]),
              -1 !== l && Jh(r, t[1].data[a + 8] === u) && Zh(s, a, t)
                ? ((o = c), (a = $r(l)), (t = Hr(l, t)))
                : (a = -1);
          }
        }
        return i;
      }
      function UC(e, t, n, r, i, s) {
        const o = t[1],
          a = o.data[e + 8],
          c = Oo(
            a,
            o,
            n,
            null == r ? wo(a) && fu : r != o && 0 != (3 & a.type),
            i & P.Host && s === a
          );
        return null !== c ? Gi(t, o, c, a) : on;
      }
      function Oo(e, t, n, r, i) {
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
      function Gi(e, t, n, r) {
        let i = e[n];
        const s = t.data;
        if (
          (function FC(e) {
            return e instanceof Ui;
          })(i)
        ) {
          const o = i;
          o.resolving &&
            (function jE(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new D(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function te(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : $(e);
              })(s[n])
            );
          const a = No(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? It(o.injectImpl) : null;
          Fh(e, r, P.Default);
          try {
            (i = e[n] = o.factory(void 0, s, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function PC(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: i,
                    ngDoCheck: s,
                  } = t.type.prototype;
                  if (r) {
                    const o = bh(t);
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
            null !== l && It(l), No(a), (o.resolving = !1), jh();
          }
        }
        return i;
      }
      function Zh(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function Jh(e, t) {
        return !(e & P.Self || (e & P.Host && t));
      }
      class Ur {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Qh(this._tNode, this._lView, t, r, n);
        }
      }
      function WC() {
        return new Ur(Re(), v());
      }
      function Xh(e) {
        const t = e[1],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[6] : null;
      }
      const Wr = "__parameters__";
      function qr(e, t, n) {
        return Fn(() => {
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
      class V {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = k({
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
      function gt(e, t) {
        void 0 === t && (t = e);
        for (let n = 0; n < e.length; n++) {
          let r = e[n];
          Array.isArray(r)
            ? (t === e && (t = e.slice(0, n)), gt(r, t))
            : t !== e && t.push(r);
        }
        return t;
      }
      function wn(e, t) {
        e.forEach((n) => (Array.isArray(n) ? wn(n, t) : t(n)));
      }
      function tp(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Fo(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function Yi(e, t) {
        const n = [];
        for (let r = 0; r < e; r++) n.push(t);
        return n;
      }
      function mt(e, t, n) {
        let r = Kr(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function ZC(e, t, n, r) {
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
        return (function ip(e, t, n) {
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
      const Zi = {},
        Du = "__NG_DI_FLAG__",
        ko = "ngTempTokenPath",
        sb = /\n/gm,
        sp = "__source";
      let Ji;
      function Qr(e) {
        const t = Ji;
        return (Ji = e), t;
      }
      function ab(e, t = P.Default) {
        if (void 0 === Ji) throw new D(-203, !1);
        return null === Ji
          ? yh(e, void 0, t)
          : Ji.get(e, t & P.Optional ? null : void 0, t);
      }
      function I(e, t = P.Default) {
        return (
          (function KE() {
            return Wl;
          })() || ab
        )(L(e), t);
      }
      function be(e, t = P.Default) {
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
      function wu(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = L(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new D(900, !1);
            let i,
              s = P.Default;
            for (let o = 0; o < r.length; o++) {
              const a = r[o],
                l = lb(a);
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
      function lb(e) {
        return e[Du];
      }
      const es = Xi(qr("Optional"), 8),
        ts = Xi(qr("SkipSelf"), 4);
      let Cu, Bo, $o;
      function Zr(e) {
        return (
          (function bu() {
            if (void 0 === Bo && ((Bo = null), le.trustedTypes))
              try {
                Bo = le.trustedTypes.createPolicy("angular", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return Bo;
          })()?.createHTML(e) || e
        );
      }
      function gp(e) {
        return (
          (function Su() {
            if (void 0 === $o && (($o = null), le.trustedTypes))
              try {
                $o = le.trustedTypes.createPolicy("angular#unsafe-bypass", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return $o;
          })()?.createHTML(e) || e
        );
      }
      class lr {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      class Cb extends lr {
        getTypeName() {
          return "HTML";
        }
      }
      class bb extends lr {
        getTypeName() {
          return "Style";
        }
      }
      class Sb extends lr {
        getTypeName() {
          return "Script";
        }
      }
      class Tb extends lr {
        getTypeName() {
          return "URL";
        }
      }
      class Ib extends lr {
        getTypeName() {
          return "ResourceURL";
        }
      }
      function yt(e) {
        return e instanceof lr ? e.changingThisBreaksApplicationSecurity : e;
      }
      function an(e, t) {
        const n = (function Mb(e) {
          return (e instanceof lr && e.getTypeName()) || null;
        })(e);
        if (null != n && n !== t) {
          if ("ResourceURL" === n && "URL" === t) return !0;
          throw new Error(
            `Required a safe ${t}, got a ${n} (see https://g.co/ng/security#xss)`
          );
        }
        return n === t;
      }
      class Ob {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = "<body><remove></remove>" + t;
          try {
            const n = new window.DOMParser().parseFromString(
              Zr(t),
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
      class Fb {
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
          if ("content" in n) return (n.innerHTML = Zr(t)), n;
          const r = this.inertDocument.createElement("body");
          return (
            (r.innerHTML = Zr(t)),
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
      const kb =
        /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
      function is(e) {
        return (e = String(e)).match(kb) ? e : "unsafe:" + e;
      }
      function _p(e) {
        return (e = String(e))
          .split(",")
          .map((t) => is(t.trim()))
          .join(", ");
      }
      function ln(e) {
        const t = {};
        for (const n of e.split(",")) t[n] = !0;
        return t;
      }
      function ss(...e) {
        const t = {};
        for (const n of e)
          for (const r in n) n.hasOwnProperty(r) && (t[r] = !0);
        return t;
      }
      const Dp = ln("area,br,col,hr,img,wbr"),
        wp = ln("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        Ep = ln("rp,rt"),
        Tu = ss(
          Dp,
          ss(
            wp,
            ln(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          ss(
            Ep,
            ln(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          ss(Ep, wp)
        ),
        Iu = ln("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        Mu = ln("srcset"),
        Cp = ss(
          Iu,
          Mu,
          ln(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          ln(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        Vb = ln("script,style,template");
      class jb {
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
          if (!Tu.hasOwnProperty(n))
            return (this.sanitizedSomething = !0), !Vb.hasOwnProperty(n);
          this.buf.push("<"), this.buf.push(n);
          const r = t.attributes;
          for (let i = 0; i < r.length; i++) {
            const s = r.item(i),
              o = s.name,
              a = o.toLowerCase();
            if (!Cp.hasOwnProperty(a)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let l = s.value;
            Iu[a] && (l = is(l)),
              Mu[a] && (l = _p(l)),
              this.buf.push(" ", o, '="', bp(l), '"');
          }
          return this.buf.push(">"), !0;
        }
        endElement(t) {
          const n = t.nodeName.toLowerCase();
          Tu.hasOwnProperty(n) &&
            !Dp.hasOwnProperty(n) &&
            (this.buf.push("</"), this.buf.push(n), this.buf.push(">"));
        }
        chars(t) {
          this.buf.push(bp(t));
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
      const Bb = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        $b = /([^\#-~ |!])/g;
      function bp(e) {
        return e
          .replace(/&/g, "&amp;")
          .replace(Bb, function (t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace($b, function (t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let Ho;
      function Sp(e, t) {
        let n = null;
        try {
          Ho =
            Ho ||
            (function vp(e) {
              const t = new Fb(e);
              return (function Lb() {
                try {
                  return !!new window.DOMParser().parseFromString(
                    Zr(""),
                    "text/html"
                  );
                } catch {
                  return !1;
                }
              })()
                ? new Ob(t)
                : t;
            })(e);
          let r = t ? String(t) : "";
          n = Ho.getInertBodyElement(r);
          let i = 5,
            s = r;
          do {
            if (0 === i)
              throw new Error(
                "Failed to sanitize html because the input is unstable"
              );
            i--, (r = s), (s = n.innerHTML), (n = Ho.getInertBodyElement(r));
          } while (r !== s);
          return Zr(new jb().sanitizeChildren(Au(n) || n));
        } finally {
          if (n) {
            const r = Au(n) || n;
            for (; r.firstChild; ) r.removeChild(r.firstChild);
          }
        }
      }
      function Au(e) {
        return "content" in e &&
          (function Hb(e) {
            return (
              e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
            );
          })(e)
          ? e.content
          : null;
      }
      var de = (() => (
        ((de = de || {})[(de.NONE = 0)] = "NONE"),
        (de[(de.HTML = 1)] = "HTML"),
        (de[(de.STYLE = 2)] = "STYLE"),
        (de[(de.SCRIPT = 3)] = "SCRIPT"),
        (de[(de.URL = 4)] = "URL"),
        (de[(de.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        de
      ))();
      function Tp(e) {
        const t = as();
        return t
          ? gp(t.sanitize(de.HTML, e) || "")
          : an(e, "HTML")
          ? gp(yt(e))
          : Sp(
              (function pp() {
                return void 0 !== Cu
                  ? Cu
                  : typeof document < "u"
                  ? document
                  : void 0;
              })(),
              $(e)
            );
      }
      function os(e) {
        const t = as();
        return t
          ? t.sanitize(de.URL, e) || ""
          : an(e, "URL")
          ? yt(e)
          : is($(e));
      }
      function as() {
        const e = v();
        return e && e[12];
      }
      const Ru = new V("ENVIRONMENT_INITIALIZER"),
        Mp = new V("INJECTOR", -1),
        Ap = new V("INJECTOR_DEF_TYPES");
      class Rp {
        get(t, n = Zi) {
          if (n === Zi) {
            const r = new Error(`NullInjectorError: No provider for ${ae(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function Qb(...e) {
        return { ɵproviders: Np(0, e) };
      }
      function Np(e, ...t) {
        const n = [],
          r = new Set();
        let i;
        return (
          wn(t, (s) => {
            const o = s;
            Nu(o, n, [], r) && (i || (i = []), i.push(o));
          }),
          void 0 !== i && xp(i, n),
          n
        );
      }
      function xp(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: i } = e[n];
          wn(i, (s) => {
            t.push(s);
          });
        }
      }
      function Nu(e, t, n, r) {
        if (!(e = L(e))) return !1;
        let i = null,
          s = gh(e);
        const o = !s && ie(e);
        if (s || o) {
          if (o && !o.standalone) return !1;
          i = e;
        } else {
          const l = e.ngModule;
          if (((s = gh(l)), !s)) return !1;
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
            for (const u of l) Nu(u, t, n, r);
          }
        } else {
          if (!s) return !1;
          {
            if (null != s.imports && !a) {
              let u;
              r.add(i);
              try {
                wn(s.imports, (c) => {
                  Nu(c, t, n, r) && (u || (u = []), u.push(c));
                });
              } finally {
              }
              void 0 !== u && xp(u, t);
            }
            if (!a) {
              const u = ar(i) || (() => new i());
              t.push(
                { provide: i, useFactory: u, deps: ne },
                { provide: Ap, useValue: i, multi: !0 },
                { provide: Ru, useValue: () => I(i), multi: !0 }
              );
            }
            const l = s.providers;
            null == l ||
              a ||
              wn(l, (c) => {
                t.push(c);
              });
          }
        }
        return i !== e && void 0 !== e.providers;
      }
      const Yb = oe({ provide: String, useValue: oe });
      function xu(e) {
        return null !== e && "object" == typeof e && Yb in e;
      }
      function ur(e) {
        return "function" == typeof e;
      }
      const Pu = new V("Set Injector scope."),
        Uo = {},
        Jb = {};
      let Ou;
      function zo() {
        return void 0 === Ou && (Ou = new Rp()), Ou;
      }
      class Bn {}
      class Fp extends Bn {
        constructor(t, n, r, i) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = i),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Lu(t, (o) => this.processProvider(o)),
            this.records.set(Mp, Jr(void 0, this)),
            i.has("environment") && this.records.set(Bn, Jr(void 0, this));
          const s = this.records.get(Pu);
          null != s && "string" == typeof s.value && this.scopes.add(s.value),
            (this.injectorDefTypes = new Set(this.get(Ap.multi, ne, P.Self)));
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
            r = It(void 0);
          try {
            return t();
          } finally {
            Qr(n), It(r);
          }
        }
        get(t, n = Zi, r = P.Default) {
          this.assertNotDestroyed();
          const i = Qr(this),
            s = It(void 0);
          try {
            if (!(r & P.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function rS(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof V)
                    );
                  })(t) && go(t);
                (a = l && this.injectableDefInScope(l) ? Jr(Fu(t), Uo) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & P.Self ? zo() : this.parent).get(
              t,
              (n = r & P.Optional && n === Zi ? null : n)
            );
          } catch (o) {
            if ("NullInjectorError" === o.name) {
              if (((o[ko] = o[ko] || []).unshift(ae(t)), i)) throw o;
              return (function ub(e, t, n, r) {
                const i = e[ko];
                throw (
                  (t[sp] && i.unshift(t[sp]),
                  (e.message = (function cb(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let i = ae(t);
                    if (Array.isArray(t)) i = t.map(ae).join(" -> ");
                    else if ("object" == typeof t) {
                      let s = [];
                      for (let o in t)
                        if (t.hasOwnProperty(o)) {
                          let a = t[o];
                          s.push(
                            o +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : ae(a))
                          );
                        }
                      i = `{${s.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${e.replace(
                      sb,
                      "\n  "
                    )}`;
                  })("\n" + e.message, i, n, r)),
                  (e.ngTokenPath = i),
                  (e[ko] = null),
                  e)
                );
              })(o, t, "R3InjectorError", this.source);
            }
            throw o;
          } finally {
            It(s), Qr(i);
          }
        }
        resolveInjectorInitializers() {
          const t = Qr(this),
            n = It(void 0);
          try {
            const r = this.get(Ru.multi, ne, P.Self);
            for (const i of r) i();
          } finally {
            Qr(t), It(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(ae(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new D(205, !1);
        }
        processProvider(t) {
          let n = ur((t = L(t))) ? t : L(t && t.provide);
          const r = (function eS(e) {
            return xu(e)
              ? Jr(void 0, e.useValue)
              : Jr(
                  (function Lp(e, t, n) {
                    let r;
                    if (ur(e)) {
                      const i = L(e);
                      return ar(i) || Fu(i);
                    }
                    if (xu(e)) r = () => L(e.useValue);
                    else if (
                      (function Op(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...wu(e.deps || []));
                    else if (
                      (function Pp(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => I(L(e.useExisting));
                    else {
                      const i = L(e && (e.useClass || e.provide));
                      if (
                        !(function tS(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return ar(i) || Fu(i);
                      r = () => new i(...wu(e.deps));
                    }
                    return r;
                  })(e),
                  Uo
                );
          })(t);
          if (ur(t) || !0 !== t.multi) this.records.get(n);
          else {
            let i = this.records.get(n);
            i ||
              ((i = Jr(void 0, Uo, !0)),
              (i.factory = () => wu(i.multi)),
              this.records.set(n, i)),
              (n = t),
              i.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Uo && ((n.value = Jb), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function nS(e) {
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
      function Fu(e) {
        const t = go(e),
          n = null !== t ? t.factory : ar(e);
        if (null !== n) return n;
        if (e instanceof V) throw new D(204, !1);
        if (e instanceof Function)
          return (function Xb(e) {
            const t = e.length;
            if (t > 0) throw (Yi(t, "?"), new D(204, !1));
            const n = (function WE(e) {
              const t = e && (e[mo] || e[mh]);
              if (t) {
                const n = (function GE(e) {
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
      function Jr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function iS(e) {
        return !!e.ɵproviders;
      }
      function Lu(e, t) {
        for (const n of e)
          Array.isArray(n) ? Lu(n, t) : iS(n) ? Lu(n.ɵproviders, t) : t(n);
      }
      class kp {}
      class aS {
        resolveComponentFactory(t) {
          throw (function oS(e) {
            const t = Error(
              `No component factory found for ${ae(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let ls = (() => {
        class e {}
        return (e.NULL = new aS()), e;
      })();
      function lS() {
        return Xr(Re(), v());
      }
      function Xr(e, t) {
        return new qt(Rt(e, t));
      }
      let qt = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = lS), e;
      })();
      function uS(e) {
        return e instanceof qt ? e.nativeElement : e;
      }
      class us {}
      let Wo = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function cS() {
                const e = v(),
                  n = pt(Re().index, e);
                return (at(n) ? n : e)[W];
              })()),
            e
          );
        })(),
        dS = (() => {
          class e {}
          return (
            (e.ɵprov = k({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class Go {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const fS = new Go("14.2.0"),
        ku = {};
      function Hu(e) {
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
          let n = t && Hu(t);
          for (; n && Hu(n); ) n = Hu(n);
          return n || null;
        }
      }
      const Uu = new Map();
      let bS = 0;
      const Wu = "__ngContext__";
      function Ge(e, t) {
        at(t)
          ? ((e[Wu] = t[20]),
            (function TS(e) {
              Uu.set(e[20], e);
            })(t))
          : (e[Wu] = t);
      }
      function cs(e) {
        const t = e[Wu];
        return "number" == typeof t
          ? (function zp(e) {
              return Uu.get(e) || null;
            })(t)
          : t || null;
      }
      function Gu(e) {
        const t = cs(e);
        return t ? (at(t) ? t : t.lView) : null;
      }
      function Qp(e) {
        return e.ownerDocument;
      }
      function En(e) {
        return e instanceof Function ? e() : e;
      }
      var lt = (() => (
        ((lt = lt || {})[(lt.Important = 1)] = "Important"),
        (lt[(lt.DashCase = 2)] = "DashCase"),
        lt
      ))();
      function Ku(e, t) {
        return undefined(e, t);
      }
      function ds(e) {
        const t = e[3];
        return Wt(t) ? t[3] : t;
      }
      function Qu(e) {
        return Jp(e[13]);
      }
      function Yu(e) {
        return Jp(e[4]);
      }
      function Jp(e) {
        for (; null !== e && !Wt(e); ) e = e[4];
        return e;
      }
      function ni(e, t, n, r, i) {
        if (null != r) {
          let s,
            o = !1;
          Wt(r) ? (s = r) : at(r) && ((o = !0), (r = r[0]));
          const a = Ie(r);
          0 === e && null !== n
            ? null == i
              ? ig(t, n, a)
              : cr(t, n, a, i || null, !0)
            : 1 === e && null !== n
            ? cr(t, n, a, i || null, !0)
            : 2 === e
            ? (function dg(e, t, n) {
                const r = qo(e, t);
                r &&
                  (function JS(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, o)
            : 3 === e && t.destroyNode(a),
            null != s &&
              (function tT(e, t, n, r, i) {
                const s = n[7];
                s !== Ie(n) && ni(t, e, r, s, i);
                for (let a = 10; a < n.length; a++) {
                  const l = n[a];
                  fs(l[1], l, e, t, r, s);
                }
              })(t, e, s, n, i);
        }
      }
      function Ju(e, t, n) {
        return e.createElement(t, n);
      }
      function eg(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          i = t[3];
        512 & t[2] && ((t[2] &= -513), nu(i, -1)), n.splice(r, 1);
      }
      function Xu(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const i = r[17];
          null !== i && i !== e && eg(i, r), t > 0 && (e[n - 1][4] = r[4]);
          const s = Fo(e, 10 + t);
          !(function zS(e, t) {
            fs(e, t, t[W], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const o = s[19];
          null !== o && o.detachView(s[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -65);
        }
        return r;
      }
      function tg(e, t) {
        if (!(128 & t[2])) {
          const n = t[W];
          n.destroyNode && fs(e, t, n, 3, null, null),
            (function qS(e) {
              let t = e[13];
              if (!t) return ec(e[1], e);
              for (; t; ) {
                let n = null;
                if (at(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    at(t) && ec(t[1], t), (t = t[3]);
                  null === t && (t = e), at(t) && ec(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function ec(e, t) {
        if (!(128 & t[2])) {
          (t[2] &= -65),
            (t[2] |= 128),
            (function ZS(e, t) {
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
            (function YS(e, t) {
              const n = e.cleanup,
                r = t[7];
              let i = -1;
              if (null !== n)
                for (let s = 0; s < n.length - 1; s += 2)
                  if ("string" == typeof n[s]) {
                    const o = n[s + 1],
                      a = "function" == typeof o ? o(t) : Ie(t[o]),
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
            1 === t[1].type && t[W].destroy();
          const n = t[17];
          if (null !== n && Wt(t[3])) {
            n !== t[3] && eg(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
          !(function IS(e) {
            Uu.delete(e[20]);
          })(t);
        }
      }
      function ng(e, t, n) {
        return (function rg(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const i = e.data[r.directiveStart].encapsulation;
            if (i === Ut.None || i === Ut.Emulated) return null;
          }
          return Rt(r, n);
        })(e, t.parent, n);
      }
      function cr(e, t, n, r, i) {
        e.insertBefore(t, n, r, i);
      }
      function ig(e, t, n) {
        e.appendChild(t, n);
      }
      function sg(e, t, n, r, i) {
        null !== r ? cr(e, t, n, r, i) : ig(e, t, n);
      }
      function qo(e, t) {
        return e.parentNode(t);
      }
      function og(e, t, n) {
        return lg(e, t, n);
      }
      let lg = function ag(e, t, n) {
        return 40 & e.type ? Rt(e, n) : null;
      };
      function Ko(e, t, n, r) {
        const i = ng(e, r, t),
          s = t[W],
          a = og(r.parent || t[6], r, t);
        if (null != i)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) sg(s, i, n[l], a, !1);
          else sg(s, i, n, a, !1);
      }
      function Qo(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Rt(t, e);
          if (4 & n) return nc(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Qo(e, r);
            {
              const i = e[t.index];
              return Wt(i) ? nc(-1, i) : Ie(i);
            }
          }
          if (32 & n) return Ku(t, e)() || Ie(e[t.index]);
          {
            const r = cg(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Qo(ds(e[16]), r)
              : Qo(e, t.next);
          }
        }
        return null;
      }
      function cg(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function nc(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            i = r[1].firstChild;
          if (null !== i) return Qo(r, i);
        }
        return t[7];
      }
      function rc(e, t, n, r, i, s, o) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (o && 0 === t && (a && Ge(Ie(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) rc(e, t, n.child, r, i, s, !1), ni(t, e, i, a, s);
            else if (32 & l) {
              const u = Ku(n, r);
              let c;
              for (; (c = u()); ) ni(t, e, i, c, s);
              ni(t, e, i, a, s);
            } else 16 & l ? fg(e, t, r, n, i, s) : ni(t, e, i, a, s);
          n = o ? n.projectionNext : n.next;
        }
      }
      function fs(e, t, n, r, i, s) {
        rc(n, r, e.firstChild, t, i, s, !1);
      }
      function fg(e, t, n, r, i, s) {
        const o = n[16],
          l = o[6].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) ni(t, e, i, l[u], s);
        else rc(e, t, l, o[3], i, s, !0);
      }
      function hg(e, t, n) {
        e.setAttribute(t, "style", n);
      }
      function ic(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function pg(e, t, n) {
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
      const gg = "ng-template";
      function rT(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let i = e[r++];
          if (n && "class" === i) {
            if (((i = e[r]), -1 !== pg(i.toLowerCase(), t, 0))) return !0;
          } else if (1 === i) {
            for (; r < e.length && "string" == typeof (i = e[r++]); )
              if (i.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function mg(e) {
        return 4 === e.type && e.value !== gg;
      }
      function iT(e, t, n) {
        return t === (4 !== e.type || n ? e.value : gg);
      }
      function sT(e, t, n) {
        let r = 4;
        const i = e.attrs || [],
          s = (function lT(e) {
            for (let t = 0; t < e.length; t++) if ($h(e[t])) return t;
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
                const d = oT(8 & r ? "class" : l, i, mg(e), n);
                if (-1 === d) {
                  if (Kt(r)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== u) {
                  let f;
                  f = d > s ? "" : i[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== pg(h, u, 0)) || (2 & r && u !== f)) {
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
      function yg(e, t, n = !1) {
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
      function vg(e, t) {
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
            "" !== i && !Kt(o) && ((t += vg(s, i)), (i = "")),
              (r = o),
              (s = s || !Kt(r));
          n++;
        }
        return "" !== i && (t += vg(s, i)), t;
      }
      const H = {};
      function se(e) {
        _g(Y(), v(), nt() + e, !1);
      }
      function _g(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const s = e.preOrderCheckHooks;
            null !== s && Io(t, s, n);
          } else {
            const s = e.preOrderHooks;
            null !== s && Mo(t, s, 0, n);
          }
        Vn(n);
      }
      function Cg(e, t = null, n = null, r) {
        const i = bg(e, t, n, r);
        return i.resolveInjectorInitializers(), i;
      }
      function bg(e, t = null, n = null, r, i = new Set()) {
        const s = [n || ne, Qb(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : ae(e))),
          new Fp(s, t || zo(), r || null, i)
        );
      }
      let Nt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return Cg({ name: "" }, r, n, "");
            {
              const i = n.name ?? "";
              return Cg({ name: i }, n.parent, n.providers, i);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Zi),
          (e.NULL = new Rp()),
          (e.ɵprov = k({ token: e, providedIn: "any", factory: () => I(Mp) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function T(e, t = P.Default) {
        const n = v();
        return null === n ? I(e, t) : Qh(Re(), n, L(e), t);
      }
      function uc() {
        throw new Error("invalid");
      }
      function Zo(e, t) {
        return (e << 17) | (t << 2);
      }
      function Qt(e) {
        return (e >> 17) & 32767;
      }
      function cc(e) {
        return 2 | e;
      }
      function Cn(e) {
        return (131068 & e) >> 2;
      }
      function dc(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function fc(e) {
        return 1 | e;
      }
      function $g(e, t) {
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
      function ea(e, t, n, r, i, s, o, a, l, u, c) {
        const d = t.blueprint.slice();
        return (
          (d[0] = i),
          (d[2] = 76 | r),
          (null !== c || (e && 1024 & e[2])) && (d[2] |= 1024),
          Mh(d),
          (d[3] = d[15] = e),
          (d[8] = n),
          (d[10] = o || (e && e[10])),
          (d[W] = a || (e && e[W])),
          (d[12] = l || (e && e[12]) || null),
          (d[9] = u || (e && e[9]) || null),
          (d[6] = s),
          (d[20] = (function SS() {
            return bS++;
          })()),
          (d[21] = c),
          (d[16] = 2 == t.type ? e[16] : d),
          d
        );
      }
      function ii(e, t, n, r, i) {
        let s = e.data[t];
        if (null === s)
          (s = (function Dc(e, t, n, r, i) {
            const s = Nh(),
              o = ru(),
              l = (e.data[t] = (function KT(e, t, n, r, i, s) {
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
          const o = (function Hi() {
            const e = B.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          s.injectorIndex = null === o ? -1 : o.injectorIndex;
        }
        return sn(s, !0), s;
      }
      function si(e, t, n, r) {
        if (0 === n) return -1;
        const i = t.length;
        for (let s = 0; s < n; s++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return i;
      }
      function ta(e, t, n) {
        lu(t);
        try {
          const r = e.viewQuery;
          null !== r && Ac(1, r, n);
          const i = e.template;
          null !== i && Hg(e, t, i, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && $g(e, t),
            e.staticViewQueries && Ac(2, e.viewQuery, n);
          const s = e.components;
          null !== s &&
            (function zT(e, t) {
              for (let n = 0; n < t.length; n++) d0(e, t[n]);
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
      function hs(e, t, n, r) {
        const i = t[2];
        if (128 != (128 & i)) {
          lu(t);
          try {
            Mh(t),
              (function xh(e) {
                return (B.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Hg(e, t, n, 2, r);
            const o = 3 == (3 & i);
            if (o) {
              const u = e.preOrderCheckHooks;
              null !== u && Io(t, u, null);
            } else {
              const u = e.preOrderHooks;
              null !== u && Mo(t, u, 0, null), cu(t, 0);
            }
            if (
              ((function u0(e) {
                for (let t = Qu(e); null !== t; t = Yu(t)) {
                  if (!t[2]) continue;
                  const n = t[9];
                  for (let r = 0; r < n.length; r++) {
                    const i = n[r],
                      s = i[3];
                    0 == (512 & i[2]) && nu(s, 1), (i[2] |= 512);
                  }
                }
              })(t),
              (function l0(e) {
                for (let t = Qu(e); null !== t; t = Yu(t))
                  for (let n = 10; n < t.length; n++) {
                    const r = t[n],
                      i = r[1];
                    bo(r) && hs(i, r, i.template, r[8]);
                  }
              })(t),
              null !== e.contentQueries && $g(e, t),
              o)
            ) {
              const u = e.contentCheckHooks;
              null !== u && Io(t, u);
            } else {
              const u = e.contentHooks;
              null !== u && Mo(t, u, 1), cu(t, 1);
            }
            !(function HT(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const i = n[r];
                    if (i < 0) Vn(~i);
                    else {
                      const s = i,
                        o = n[++r],
                        a = n[++r];
                      CC(o, s), a(2, t[s]);
                    }
                  }
                } finally {
                  Vn(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function UT(e, t) {
                for (let n = 0; n < t.length; n++) c0(e, t[n]);
              })(t, a);
            const l = e.viewQuery;
            if ((null !== l && Ac(2, l, r), o)) {
              const u = e.viewCheckHooks;
              null !== u && Io(t, u);
            } else {
              const u = e.viewHooks;
              null !== u && Mo(t, u, 2), cu(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), nu(t[3], -1));
          } finally {
            uu();
          }
        }
      }
      function WT(e, t, n, r) {
        const i = t[10],
          o = Ih(t);
        try {
          !o && i.begin && i.begin(), o && ta(e, t, r), hs(e, t, n, r);
        } finally {
          !o && i.end && i.end();
        }
      }
      function Hg(e, t, n, r, i) {
        const s = nt(),
          o = 2 & r;
        try {
          Vn(-1), o && t.length > 22 && _g(e, t, 22, !1), n(r, i);
        } finally {
          Vn(s);
        }
      }
      function Ug(e, t, n) {
        if (Yl(t)) {
          const i = t.directiveEnd;
          for (let s = t.directiveStart; s < i; s++) {
            const o = e.data[s];
            o.contentQueries && o.contentQueries(1, n[s], s);
          }
        }
      }
      function wc(e, t, n) {
        !Rh() ||
          ((function XT(e, t, n, r) {
            const i = n.directiveStart,
              s = n.directiveEnd;
            e.firstCreatePass || Wi(n, t), Ge(r, t);
            const o = n.initialInputs;
            for (let a = i; a < s; a++) {
              const l = e.data[a],
                u = Gt(l);
              u && s0(t, n, l);
              const c = Gi(t, e, a, n);
              Ge(c, t),
                null !== o && o0(0, a - i, c, l, 0, o),
                u && (pt(n.index, t)[8] = c);
            }
          })(e, t, n, Rt(n, t)),
          128 == (128 & n.flags) &&
            (function e0(e, t, n) {
              const r = n.directiveStart,
                i = n.directiveEnd,
                s = n.index,
                o = (function bC() {
                  return B.lFrame.currentDirectiveIndex;
                })();
              try {
                Vn(s);
                for (let a = r; a < i; a++) {
                  const l = e.data[a],
                    u = t[a];
                  su(a),
                    (null !== l.hostBindings ||
                      0 !== l.hostVars ||
                      null !== l.hostAttrs) &&
                      Yg(l, u);
                }
              } finally {
                Vn(-1), su(o);
              }
            })(e, t, n));
      }
      function Ec(e, t, n = Rt) {
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
      function zg(e) {
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
          f = (function GT(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : H);
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
      function Wg(e, t, n, r) {
        const i = nm(t);
        null === n
          ? i.push(r)
          : (i.push(n), e.firstCreatePass && rm(e).push(r, i.length - 1));
      }
      function Gg(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const i = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, i)
              : (n[r] = [t, i]);
          }
        return n;
      }
      function qg(e, t) {
        const r = t.directiveEnd,
          i = e.data,
          s = t.attrs,
          o = [];
        let a = null,
          l = null;
        for (let u = t.directiveStart; u < r; u++) {
          const c = i[u],
            d = c.inputs,
            f = null === s || mg(t) ? null : a0(d, s);
          o.push(f), (a = Gg(d, u, a)), (l = Gg(c.outputs, u, l));
        }
        null !== a &&
          (a.hasOwnProperty("class") && (t.flags |= 16),
          a.hasOwnProperty("style") && (t.flags |= 32)),
          (t.initialInputs = o),
          (t.inputs = a),
          (t.outputs = l);
      }
      function Kg(e, t) {
        const n = pt(t, e);
        16 & n[2] || (n[2] |= 32);
      }
      function bc(e, t, n, r) {
        let i = !1;
        if (Rh()) {
          const s = (function t0(e, t, n) {
              const r = e.directiveRegistry;
              let i = null;
              if (r)
                for (let s = 0; s < r.length; s++) {
                  const o = r[s];
                  yg(n, o.selectors, !1) &&
                    (i || (i = []),
                    Po(Wi(n, t), e, o.type),
                    Gt(o) ? (Zg(e, n), i.unshift(o)) : i.push(o));
                }
              return i;
            })(e, t, n),
            o = null === r ? null : { "": -1 };
          if (null !== s) {
            (i = !0), Jg(n, e.data.length, s.length);
            for (let c = 0; c < s.length; c++) {
              const d = s[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              u = si(e, t, s.length, null);
            for (let c = 0; c < s.length; c++) {
              const d = s[c];
              (n.mergedAttrs = Ro(n.mergedAttrs, d.hostAttrs)),
                Xg(e, n, t, u, d),
                r0(u, d, o),
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
            qg(e, n);
          }
          o &&
            (function n0(e, t, n) {
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
        return (n.mergedAttrs = Ro(n.mergedAttrs, n.attrs)), i;
      }
      function Qg(e, t, n, r, i, s) {
        const o = s.hostBindings;
        if (o) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const l = ~t.index;
          (function JT(e) {
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
      function Yg(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Zg(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function r0(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Gt(t) && (n[""] = e);
        }
      }
      function Jg(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function Xg(e, t, n, r, i) {
        e.data[r] = i;
        const s = i.factory || (i.factory = ar(i.type)),
          o = new Ui(s, Gt(i), T);
        (e.blueprint[r] = o),
          (n[r] = o),
          Qg(e, t, 0, r, si(e, n, i.hostVars, H), i);
      }
      function s0(e, t, n) {
        const r = Rt(t, e),
          i = zg(n),
          s = e[10],
          o = na(
            e,
            ea(
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
      function o0(e, t, n, r, i, s) {
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
      function a0(e, t) {
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
      function em(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function c0(e, t) {
        const n = pt(t, e);
        if (bo(n)) {
          const r = n[1];
          48 & n[2] ? hs(r, n, r.template, n[8]) : n[5] > 0 && Tc(n);
        }
      }
      function Tc(e) {
        for (let r = Qu(e); null !== r; r = Yu(r))
          for (let i = 10; i < r.length; i++) {
            const s = r[i];
            if (bo(s))
              if (512 & s[2]) {
                const o = s[1];
                hs(o, s, o.template, s[8]);
              } else s[5] > 0 && Tc(s);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const i = pt(n[r], e);
            bo(i) && i[5] > 0 && Tc(i);
          }
      }
      function d0(e, t) {
        const n = pt(t, e),
          r = n[1];
        (function f0(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          ta(r, n, n[8]);
      }
      function na(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function Ic(e) {
        for (; e; ) {
          e[2] |= 32;
          const t = ds(e);
          if (tC(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Ac(e, t, n) {
        au(0), t(e, n);
      }
      function nm(e) {
        return e[7] || (e[7] = []);
      }
      function rm(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function sm(e, t) {
        const n = e[9],
          r = n ? n.get(ei, null) : null;
        r && r.handleError(t);
      }
      function Rc(e, t, n, r, i) {
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
          if ((null !== s && r.push(Ie(s)), Wt(s)))
            for (let a = 10; a < s.length; a++) {
              const l = s[a],
                u = l[1].firstChild;
              null !== u && ia(l[1], l, u, r);
            }
          const o = n.type;
          if (8 & o) ia(e, t, n.child, r);
          else if (32 & o) {
            const a = Ku(n, t);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & o) {
            const a = cg(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = ds(t[16]);
              ia(l[1], l, a, r, !0);
            }
          }
          n = i ? n.projectionNext : n.next;
        }
        return r;
      }
      class ps {
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
              r > -1 && (Xu(t, r), Fo(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          tg(this._lView[1], this._lView);
        }
        onDestroy(t) {
          Wg(this._lView[1], this._lView, null, t);
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
          !(function Mc(e, t, n) {
            const r = t[10];
            r.begin && r.begin();
            try {
              hs(e, t, e.template, n);
            } catch (i) {
              throw (sm(t, i), i);
            } finally {
              r.end && r.end();
            }
          })(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new D(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function GS(e, t) {
              fs(e, t, t[W], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new D(902, !1);
          this._appRef = t;
        }
      }
      class p0 extends ps {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          !(function tm(e) {
            !(function h0(e) {
              for (let t = 0; t < e.components.length; t++) {
                const n = e.components[t],
                  r = Gu(n);
                if (null !== r) {
                  const i = r[1];
                  WT(i, r, i.template, n);
                }
              }
            })(e[8]);
          })(this._view);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Nc extends ls {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = ie(t);
          return new gs(n, this.ngModule);
        }
      }
      function om(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class m0 {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          const i = this.injector.get(t, ku, r);
          return i !== ku || n === ku ? i : this.parentInjector.get(t, n, r);
        }
      }
      class gs extends kp {
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
          return om(this.componentDef.inputs);
        }
        get outputs() {
          return om(this.componentDef.outputs);
        }
        create(t, n, r, i) {
          let s = (i = i || this.ngModule) instanceof Bn ? i : i?.injector;
          s &&
            null !== this.componentDef.getStandaloneInjector &&
            (s = this.componentDef.getStandaloneInjector(s) || s);
          const o = s ? new m0(t, s) : t,
            a = o.get(us, null);
          if (null === a) throw new D(407, !1);
          const l = o.get(dS, null),
            u = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function qT(e, t, n) {
                  return e.selectRootElement(t, n === Ut.ShadowDom);
                })(u, r, this.componentDef.encapsulation)
              : Ju(
                  a.createRenderer(null, this.componentDef),
                  c,
                  (function g0(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = { components: [] },
            p = Cc(0, null, null, 1, 0, null, null, null, null, null),
            g = ea(null, p, h, f, null, null, a, u, l, o, null);
          let m, _;
          lu(g);
          try {
            const w = (function _0(e, t, n, r, i, s) {
              const o = n[1];
              n[22] = e;
              const l = ii(o, 22, 2, "#host", null),
                u = (l.mergedAttrs = t.hostAttrs);
              null !== u &&
                (ra(l, u, !0),
                null !== e &&
                  (Ao(i, e, u),
                  null !== l.classes && ic(i, e, l.classes),
                  null !== l.styles && hg(i, e, l.styles)));
              const c = r.createRenderer(e, t),
                d = ea(
                  n,
                  zg(t),
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
                  (Po(Wi(l, n), o, t.type), Zg(o, l), Jg(l, n.length, 1)),
                na(n, d),
                (n[22] = d)
              );
            })(d, this.componentDef, g, a, u);
            if (d)
              if (r) Ao(u, d, ["ng-version", fS.full]);
              else {
                const { attrs: y, classes: E } = (function hT(e) {
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
                y && Ao(u, d, y), E && E.length > 0 && ic(u, d, E.join(" "));
              }
            if (((_ = tu(p, 22)), void 0 !== n)) {
              const y = (_.projection = []);
              for (let E = 0; E < this.ngContentSelectors.length; E++) {
                const j = n[E];
                y.push(null != j ? Array.from(j) : null);
              }
            }
            (m = (function D0(e, t, n, r, i) {
              const s = n[1],
                o = (function ZT(e, t, n) {
                  const r = Re();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Xg(e, r, t, si(e, t, 1, null), n),
                    qg(e, r));
                  const i = Gi(t, e, r.directiveStart, r);
                  Ge(i, t);
                  const s = Rt(r, t);
                  return s && Ge(s, t), i;
                })(s, n, t);
              if ((r.components.push(o), (e[8] = o), null !== i))
                for (const l of i) l(o, t);
              if (t.contentQueries) {
                const l = Re();
                t.contentQueries(1, o, l.directiveStart);
              }
              const a = Re();
              return (
                !s.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (Vn(a.index),
                  Qg(n[1], a, 0, a.directiveStart, a.directiveEnd, t),
                  Yg(t, o)),
                o
              );
            })(w, this.componentDef, g, h, [E0])),
              ta(p, g, null);
          } finally {
            uu();
          }
          return new v0(this.componentType, m, Xr(_, g), g, _);
        }
      }
      class v0 extends class sS {} {
        constructor(t, n, r, i, s) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = s),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new p0(i)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let i;
          if (null !== r && (i = r[t])) {
            const s = this._rootLView;
            Rc(s[1], s, i, t, n), Kg(s, this._tNode.index);
          }
        }
        get injector() {
          return new Ur(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function E0() {
        const e = Re();
        To(v()[1], e);
      }
      let sa = null;
      function dr() {
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
      function ms(e) {
        return (
          !!Pc(e) && (Array.isArray(e) || (!(e instanceof Map) && dr() in e))
        );
      }
      function Pc(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function cn(e, t, n) {
        return (e[t] = n);
      }
      function ys(e, t) {
        return e[t];
      }
      function qe(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function fr(e, t, n, r) {
        const i = qe(e, t, n);
        return qe(e, t + 1, r) || i;
      }
      function ue(e, t, n, r, i, s, o, a) {
        const l = v(),
          u = Y(),
          c = e + 22,
          d = u.firstCreatePass
            ? (function O0(e, t, n, r, i, s, o, a, l) {
                const u = t.consts,
                  c = ii(t, e, 4, o || null, kn(u, a));
                bc(t, n, c, kn(u, l)), To(t, c);
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
        const f = l[W].createComment("");
        Ko(u, l, f, d),
          Ge(f, l),
          na(l, (l[c] = em(f, l, f, d))),
          Eo(d) && wc(u, l, d),
          null != o && Ec(l, d, a);
      }
      function Z(e, t, n) {
        const r = v();
        return (
          qe(r, Br(), t) &&
            (function vt(e, t, n, r, i, s, o, a) {
              const l = Rt(t, n);
              let c,
                u = t.inputs;
              !a && null != u && (c = u[r])
                ? (Rc(e, n, c, r, i), wo(t) && Kg(n, t.index))
                : 3 & t.type &&
                  ((r = (function QT(e) {
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
              (function De() {
                const e = B.lFrame;
                return tu(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[W],
              n,
              !1
            ),
          Z
        );
      }
      function Fc(e, t, n, r, i) {
        const o = i ? "class" : "style";
        Rc(e, n, t.inputs[o], o, r);
      }
      function M(e, t, n, r) {
        const i = v(),
          s = Y(),
          o = 22 + e,
          a = i[W],
          l = (i[o] = Ju(
            a,
            t,
            (function xC() {
              return B.lFrame.currentNamespace;
            })()
          )),
          u = s.firstCreatePass
            ? (function L0(e, t, n, r, i, s, o) {
                const a = t.consts,
                  u = ii(t, e, 2, i, kn(a, s));
                return (
                  bc(t, n, u, kn(a, o)),
                  null !== u.attrs && ra(u, u.attrs, !1),
                  null !== u.mergedAttrs && ra(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(o, s, i, 0, t, n, r)
            : s.data[o];
        sn(u, !0);
        const c = u.mergedAttrs;
        null !== c && Ao(a, l, c);
        const d = u.classes;
        null !== d && ic(a, l, d);
        const f = u.styles;
        return (
          null !== f && hg(a, l, f),
          64 != (64 & u.flags) && Ko(s, i, l, u),
          0 ===
            (function pC() {
              return B.lFrame.elementDepthCount;
            })() && Ge(l, i),
          (function gC() {
            B.lFrame.elementDepthCount++;
          })(),
          Eo(u) && (wc(s, i, u), Ug(s, u, i)),
          null !== r && Ec(i, u),
          M
        );
      }
      function A() {
        let e = Re();
        ru() ? iu() : ((e = e.parent), sn(e, !1));
        const t = e;
        !(function mC() {
          B.lFrame.elementDepthCount--;
        })();
        const n = Y();
        return (
          n.firstCreatePass && (To(n, e), Yl(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function kC(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Fc(n, t, v(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function VC(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            Fc(n, t, v(), t.stylesWithoutHost, !1),
          A
        );
      }
      function pe(e, t, n, r) {
        return M(e, t, n, r), A(), pe;
      }
      function aa(e, t, n) {
        const r = v(),
          i = Y(),
          s = e + 22,
          o = i.firstCreatePass
            ? (function k0(e, t, n, r, i) {
                const s = t.consts,
                  o = kn(s, r),
                  a = ii(t, e, 8, "ng-container", o);
                return (
                  null !== o && ra(a, o, !0),
                  bc(t, n, a, kn(s, i)),
                  null !== t.queries && t.queries.elementStart(t, a),
                  a
                );
              })(s, i, r, t, n)
            : i.data[s];
        sn(o, !0);
        const a = (r[s] = r[W].createComment(""));
        return (
          Ko(i, r, a, o),
          Ge(a, r),
          Eo(o) && (wc(i, r, o), Ug(i, o, r)),
          null != n && Ec(r, o),
          aa
        );
      }
      function la() {
        let e = Re();
        const t = Y();
        return (
          ru() ? iu() : ((e = e.parent), sn(e, !1)),
          t.firstCreatePass && (To(t, e), Yl(e) && t.queries.elementEnd(e)),
          la
        );
      }
      function dn(e, t, n) {
        return aa(e, t, n), la(), dn;
      }
      function ua(e) {
        return !!e && "function" == typeof e.then;
      }
      const Dm = function _m(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function gi(e, t, n, r) {
        const i = v(),
          s = Y(),
          o = Re();
        return (
          (function Em(e, t, n, r, i, s, o, a) {
            const l = Eo(r),
              c = e.firstCreatePass && rm(e),
              d = t[8],
              f = nm(t);
            let h = !0;
            if (3 & r.type || a) {
              const m = Rt(r, t),
                _ = a ? a(m) : m,
                w = f.length,
                y = a ? (j) => a(Ie(j[r.index])) : r.index;
              let E = null;
              if (
                (!a &&
                  l &&
                  (E = (function j0(e, t, n, r) {
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
                null !== E)
              )
                ((E.__ngLastListenerFn__ || E).__ngNextListenerFn__ = s),
                  (E.__ngLastListenerFn__ = s),
                  (h = !1);
              else {
                s = bm(r, t, d, s, !1);
                const j = n.listen(_, i, s);
                f.push(s, j), c && c.push(i, y, w, w + 1);
              }
            } else s = bm(r, t, d, s, !1);
            const p = r.outputs;
            let g;
            if (h && null !== p && (g = p[i])) {
              const m = g.length;
              if (m)
                for (let _ = 0; _ < m; _ += 2) {
                  const Q = t[g[_]][g[_ + 1]].subscribe(s),
                    ye = f.length;
                  f.push(s, Q), c && c.push(i, r.index, ye, -(ye + 1));
                }
            }
          })(s, i, i[W], o, e, t, 0, r),
          gi
        );
      }
      function Cm(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (i) {
          return sm(e, i), !1;
        }
      }
      function bm(e, t, n, r, i) {
        return function s(o) {
          if (o === Function) return r;
          Ic(2 & e.flags ? pt(e.index, t) : t);
          let l = Cm(t, 0, r, o),
            u = s.__ngNextListenerFn__;
          for (; u; ) (l = Cm(t, 0, u, o) && l), (u = u.__ngNextListenerFn__);
          return i && !1 === l && (o.preventDefault(), (o.returnValue = !1)), l;
        };
      }
      function _t(e = 1) {
        return (function TC(e) {
          return (B.lFrame.contextLView = (function IC(e, t) {
            for (; e > 0; ) (t = t[15]), e--;
            return t;
          })(e, B.lFrame.contextLView))[8];
        })(e);
      }
      function B0(e, t) {
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
            if (null === r ? yg(e, s, !0) : cT(r, s)) return i;
          } else n = i;
        }
        return n;
      }
      function vs(e) {
        const t = v()[16][6];
        if (!t.projection) {
          const r = (t.projection = Yi(e ? e.length : 1, null)),
            i = r.slice();
          let s = t.child;
          for (; null !== s; ) {
            const o = e ? B0(s, e) : 0;
            null !== o &&
              (i[o] ? (i[o].projectionNext = s) : (r[o] = s), (i[o] = s)),
              (s = s.next);
          }
        }
      }
      function hr(e, t = 0, n) {
        const r = v(),
          i = Y(),
          s = ii(i, 22 + e, 16, null, n || null);
        null === s.projection && (s.projection = t),
          iu(),
          64 != (64 & s.flags) &&
            (function eT(e, t, n) {
              fg(t[W], 0, t, n, ng(e, n, t), og(n.parent || t[6], n, t));
            })(i, r, s);
      }
      function Om(e, t, n, r, i) {
        const s = e[n + 1],
          o = null === t;
        let a = r ? Qt(s) : Cn(s),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const c = e[a + 1];
          U0(e[a], t) && ((l = !0), (e[a + 1] = r ? fc(c) : cc(c))),
            (a = r ? Qt(c) : Cn(c));
        }
        l && (e[n + 1] = r ? cc(s) : fc(s));
      }
      function U0(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && Kr(e, t) >= 0)
        );
      }
      const xe = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function Fm(e) {
        return e.substring(xe.key, xe.keyEnd);
      }
      function z0(e) {
        return e.substring(xe.value, xe.valueEnd);
      }
      function Lm(e, t) {
        const n = xe.textEnd;
        return n === t
          ? -1
          : ((t = xe.keyEnd =
              (function q0(e, t, n) {
                for (; t < n && e.charCodeAt(t) > 32; ) t++;
                return t;
              })(e, (xe.key = t), n)),
            mi(e, t, n));
      }
      function km(e, t) {
        const n = xe.textEnd;
        let r = (xe.key = mi(e, t, n));
        return n === r
          ? -1
          : ((r = xe.keyEnd =
              (function K0(e, t, n) {
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
            (r = jm(e, r, n)),
            (r = xe.value = mi(e, r, n)),
            (r = xe.valueEnd =
              (function Q0(e, t, n) {
                let r = -1,
                  i = -1,
                  s = -1,
                  o = t,
                  a = o;
                for (; o < n; ) {
                  const l = e.charCodeAt(o++);
                  if (59 === l) return a;
                  34 === l || 39 === l
                    ? (a = o = Bm(e, l, o, n))
                    : t === o - 4 &&
                      85 === s &&
                      82 === i &&
                      76 === r &&
                      40 === l
                    ? (a = o = Bm(e, 41, o, n))
                    : l > 32 && (a = o),
                    (s = i),
                    (i = r),
                    (r = -33 & l);
                }
                return a;
              })(e, r, n)),
            jm(e, r, n));
      }
      function Vm(e) {
        (xe.key = 0),
          (xe.keyEnd = 0),
          (xe.value = 0),
          (xe.valueEnd = 0),
          (xe.textEnd = e.length);
      }
      function mi(e, t, n) {
        for (; t < n && e.charCodeAt(t) <= 32; ) t++;
        return t;
      }
      function jm(e, t, n, r) {
        return (t = mi(e, t, n)) < n && t++, t;
      }
      function Bm(e, t, n, r) {
        let i = -1,
          s = n;
        for (; s < r; ) {
          const o = e.charCodeAt(s++);
          if (o == t && 92 !== i) return s;
          i = 92 == o && 92 === i ? 0 : o;
        }
        throw new Error();
      }
      function yi(e, t, n) {
        return (
          (function Yt(e, t, n, r) {
            const i = v(),
              s = Y(),
              o = Dn(2);
            s.firstUpdatePass && Um(s, e, o, r),
              t !== H &&
                qe(i, o, t) &&
                Wm(
                  s,
                  s.data[nt()],
                  i,
                  i[W],
                  e,
                  (i[o + 1] = (function rI(e, t) {
                    return (
                      null == e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = ae(yt(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  o
                );
          })(e, t, n, !1),
          yi
        );
      }
      function Pt(e) {
        Zt(zm, Y0, e, !1);
      }
      function Y0(e, t) {
        for (
          let n = (function G0(e) {
            return Vm(e), km(e, mi(e, 0, xe.textEnd));
          })(t);
          n >= 0;
          n = km(t, n)
        )
          zm(e, Fm(t), z0(t));
      }
      function ca(e) {
        Zt(mt, fn, e, !0);
      }
      function fn(e, t) {
        for (
          let n = (function W0(e) {
            return Vm(e), Lm(e, mi(e, 0, xe.textEnd));
          })(t);
          n >= 0;
          n = Lm(t, n)
        )
          mt(e, Fm(t), !0);
      }
      function Zt(e, t, n, r) {
        const i = Y(),
          s = Dn(2);
        i.firstUpdatePass && Um(i, null, s, r);
        const o = v();
        if (n !== H && qe(o, s, n)) {
          const a = i.data[nt()];
          if (qm(a, r) && !Hm(i, s)) {
            let l = r ? a.classesWithoutHost : a.stylesWithoutHost;
            null !== l && (n = $l(l, n || "")), Fc(i, a, o, n, r);
          } else
            !(function nI(e, t, n, r, i, s, o, a) {
              i === H && (i = ne);
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
                  null !== p && Wm(e, t, n, r, p, g, o, a),
                  (c = l < i.length ? i[l] : null),
                  (d = u < s.length ? s[u] : null);
              }
            })(
              i,
              a,
              o,
              o[W],
              o[s + 1],
              (o[s + 1] = (function tI(e, t, n) {
                if (null == n || "" === n) return ne;
                const r = [],
                  i = yt(n);
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
      function Hm(e, t) {
        return t >= e.expandoStartIndex;
      }
      function Um(e, t, n, r) {
        const i = e.data;
        if (null === i[n + 1]) {
          const s = i[nt()],
            o = Hm(e, n);
          qm(s, r) && null === t && !o && (t = !1),
            (t = (function Z0(e, t, n, r) {
              const i = (function ou(e) {
                const t = B.lFrame.currentDirectiveIndex;
                return -1 === t ? null : e[t];
              })(e);
              let s = r ? t.residualClasses : t.residualStyles;
              if (null === i)
                0 === (r ? t.classBindings : t.styleBindings) &&
                  ((n = _s((n = kc(null, e, t, n, r)), t.attrs, r)),
                  (s = null));
              else {
                const o = t.directiveStylingLast;
                if (-1 === o || e[o] !== i)
                  if (((n = kc(i, e, t, n, r)), null === s)) {
                    let l = (function J0(e, t, n) {
                      const r = n ? t.classBindings : t.styleBindings;
                      if (0 !== Cn(r)) return e[Qt(r)];
                    })(e, t, r);
                    void 0 !== l &&
                      Array.isArray(l) &&
                      ((l = kc(null, e, t, l[1], r)),
                      (l = _s(l, t.attrs, r)),
                      (function X0(e, t, n, r) {
                        e[Qt(n ? t.classBindings : t.styleBindings)] = r;
                      })(e, t, r, l));
                  } else
                    s = (function eI(e, t, n) {
                      let r;
                      const i = t.directiveEnd;
                      for (let s = 1 + t.directiveStylingLast; s < i; s++)
                        r = _s(r, e[s].hostAttrs, n);
                      return _s(r, t.attrs, n);
                    })(e, t, r);
              }
              return (
                void 0 !== s &&
                  (r ? (t.residualClasses = s) : (t.residualStyles = s)),
                n
              );
            })(i, s, t, r)),
            (function $0(e, t, n, r, i, s) {
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
                  (e[r + 1] = Zo(f, a)),
                    0 !== f && (e[f + 1] = dc(e[f + 1], r)),
                    (e[a + 1] = (function xT(e, t) {
                      return (131071 & e) | (t << 17);
                    })(e[a + 1], r));
                } else
                  (e[r + 1] = Zo(a, 0)),
                    0 !== a && (e[a + 1] = dc(e[a + 1], r)),
                    (a = r);
              else
                (e[r + 1] = Zo(l, 0)),
                  0 === a ? (a = r) : (e[l + 1] = dc(e[l + 1], r)),
                  (l = r);
              u && (e[r + 1] = cc(e[r + 1])),
                Om(e, c, r, !0),
                Om(e, c, r, !1),
                (function H0(e, t, n, r, i) {
                  const s = i ? e.residualClasses : e.residualStyles;
                  null != s &&
                    "string" == typeof t &&
                    Kr(s, t) >= 0 &&
                    (n[r + 1] = fc(n[r + 1]));
                })(t, c, e, r, s),
                (o = Zo(a, l)),
                s ? (t.classBindings = o) : (t.styleBindings = o);
            })(i, s, t, n, o, r);
        }
      }
      function kc(e, t, n, r, i) {
        let s = null;
        const o = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < o && ((s = t[a]), (r = _s(r, s.hostAttrs, i)), s !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function _s(e, t, n) {
        const r = n ? 1 : 2;
        let i = -1;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const o = t[s];
            "number" == typeof o
              ? (i = o)
              : i === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                mt(e, o, !!n || t[++s]));
          }
        return void 0 === e ? null : e;
      }
      function zm(e, t, n) {
        mt(e, t, yt(n));
      }
      function Wm(e, t, n, r, i, s, o, a) {
        if (!(3 & t.type)) return;
        const l = e.data,
          u = l[a + 1];
        da(
          (function Pg(e) {
            return 1 == (1 & e);
          })(u)
            ? Gm(l, t, n, i, Cn(u), o)
            : void 0
        ) ||
          (da(s) ||
            ((function xg(e) {
              return 2 == (2 & e);
            })(u) &&
              (s = Gm(l, null, n, i, a, o))),
          (function nT(e, t, n, r, i) {
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
          })(r, o, Co(nt(), n), i, s));
      }
      function Gm(e, t, n, r, i, s) {
        const o = null === t;
        let a;
        for (; i > 0; ) {
          const l = e[i],
            u = Array.isArray(l),
            c = u ? l[1] : l,
            d = null === c;
          let f = n[i + 1];
          f === H && (f = d ? ne : void 0);
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
      function qm(e, t) {
        return 0 != (e.flags & (t ? 16 : 32));
      }
      function ee(e, t = "") {
        const n = v(),
          r = Y(),
          i = e + 22,
          s = r.firstCreatePass ? ii(r, i, 1, t, null) : r.data[i],
          o = (n[i] = (function Zu(e, t) {
            return e.createText(t);
          })(n[W], t));
        Ko(r, n, o, s), sn(s, !1);
      }
      function Vc(e) {
        return Ds("", e, ""), Vc;
      }
      function Ds(e, t, n) {
        const r = v(),
          i = (function ai(e, t, n, r) {
            return qe(e, Br(), n) ? t + $(n) + r : H;
          })(r, e, t, n);
        return (
          i !== H &&
            (function bn(e, t, n) {
              const r = Co(t, e);
              !(function Xp(e, t, n) {
                e.setValue(t, n);
              })(e[W], r, n);
            })(r, nt(), i),
          Ds
        );
      }
      const _i = "en-US";
      let gy = _i;
      class gr {}
      class $y {}
      class Hy extends gr {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Nc(this));
          const r = ft(t);
          (this._bootstrapComponents = En(r.bootstrap)),
            (this._r3Injector = bg(
              t,
              n,
              [
                { provide: gr, useValue: this },
                { provide: ls, useValue: this.componentFactoryResolver },
              ],
              ae(t),
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
      class Wc extends $y {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Hy(this.moduleType, t);
        }
      }
      class bM extends gr {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new Nc(this)),
            (this.instance = null);
          const i = new Fp(
            [
              ...t,
              { provide: gr, useValue: this },
              { provide: ls, useValue: this.componentFactoryResolver },
            ],
            n || zo(),
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
        return new bM(e, t, n).injector;
      }
      let SM = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = Np(0, n.type),
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
          (e.ɵprov = k({
            token: e,
            providedIn: "environment",
            factory: () => new e(I(Bn)),
          })),
          e
        );
      })();
      function Uy(e) {
        e.getStandaloneInjector = (t) =>
          t.get(SM).getOrCreateStandaloneInjector(e);
      }
      function qc(e, t, n) {
        const r = tt() + e,
          i = v();
        return i[r] === H ? cn(i, r, n ? t.call(n) : t()) : ys(i, r);
      }
      function ya(e, t, n, r) {
        return Zy(v(), tt(), e, t, n, r);
      }
      function Yy(e, t, n, r, i, s, o, a, l, u) {
        const c = tt() + e,
          d = v();
        let f = (function xt(e, t, n, r, i, s) {
          const o = fr(e, t, n, r);
          return fr(e, t + 2, i, s) || o;
        })(d, c, n, r, i, s);
        return (function oa(e, t, n, r, i) {
          const s = fr(e, t, n, r);
          return qe(e, t + 2, i) || s;
        })(d, c + 4, o, a, l) || f
          ? cn(
              d,
              c + 7,
              u ? t.call(u, n, r, i, s, o, a, l) : t(n, r, i, s, o, a, l)
            )
          : ys(d, c + 7);
      }
      function Zy(e, t, n, r, i, s) {
        const o = t + n;
        return qe(e, o, i)
          ? cn(e, o + 1, s ? r.call(s, i) : r(i))
          : (function Ss(e, t) {
              const n = e[t];
              return n === H ? void 0 : n;
            })(e, o + 1);
      }
      function Kc(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const st = class GM extends $t {
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
          this.__isAsync && ((s = Kc(s)), i && (i = Kc(i)), o && (o = Kc(o)));
          const a = super.subscribe({ next: i, error: s, complete: o });
          return t instanceof _e && t.add(a), a;
        }
      };
      function qM() {
        return this._results[dr()]();
      }
      class Qc {
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = dr(),
            r = Qc.prototype;
          r[n] || (r[n] = qM);
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
          const i = gt(t);
          (this._changesDetected = !(function QC(e, t, n) {
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
      let hn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = YM), e;
      })();
      const KM = hn,
        QM = class extends KM {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tViews,
              i = ea(
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
              ta(r, i, t),
              new ps(i)
            );
          }
        };
      function YM() {
        return va(Re(), v());
      }
      function va(e, t) {
        return 4 & e.type ? new QM(t, e, Xr(e, t)) : null;
      }
      let Jt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = ZM), e;
      })();
      function ZM() {
        return ov(Re(), v());
      }
      const JM = Jt,
        iv = class extends JM {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Xr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Ur(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = xo(this._hostTNode, this._hostLView);
            if (zh(t)) {
              const n = Hr(t, this._hostLView),
                r = $r(t);
              return new Ur(n[1].data[r + 8], n);
            }
            return new Ur(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = sv(this._lContainer);
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
              !(function Qi(e) {
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
            const l = o ? t : new gs(ie(t)),
              u = r || this.parentInjector;
            if (!s && null == l.ngModule) {
              const f = (o ? u : this.parentInjector).get(Bn, null);
              f && (s = f);
            }
            const c = l.create(u, i, void 0, s);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              i = r[1];
            if (
              (function hC(e) {
                return Wt(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new iv(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const s = this._adjustIndex(n),
              o = this._lContainer;
            !(function KS(e, t, n, r) {
              const i = 10 + r,
                s = n.length;
              r > 0 && (n[i - 1][4] = t),
                r < s - 10
                  ? ((t[4] = n[i]), tp(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const o = t[17];
              null !== o &&
                n !== o &&
                (function QS(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(o, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 64);
            })(i, r, o, s);
            const a = nc(s, o),
              l = r[W],
              u = qo(l, o[7]);
            return (
              null !== u &&
                (function WS(e, t, n, r, i, s) {
                  (r[0] = i), (r[6] = t), fs(e, r, n, 1, i, s);
                })(i, o[6], l, r, u, a),
              t.attachToViewContainerRef(),
              tp(Yc(o), s, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = sv(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Xu(this._lContainer, n);
            r && (Fo(Yc(this._lContainer), n), tg(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Xu(this._lContainer, n);
            return r && null != Fo(Yc(this._lContainer), n) ? new ps(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function sv(e) {
        return e[8];
      }
      function Yc(e) {
        return e[8] || (e[8] = []);
      }
      function ov(e, t) {
        let n;
        const r = t[e.index];
        if (Wt(r)) n = r;
        else {
          let i;
          if (8 & e.type) i = Ie(r);
          else {
            const s = t[W];
            i = s.createComment("");
            const o = Rt(e, t);
            cr(
              s,
              qo(s, o),
              i,
              (function XS(e, t) {
                return e.nextSibling(t);
              })(s, o),
              !1
            );
          }
          (t[e.index] = n = em(r, t, i, e)), na(t, n);
        }
        return new iv(n, e, t);
      }
      class Zc {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Zc(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Jc {
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
            return new Jc(i);
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
            null !== fv(t, n).matches && this.queries[n].setDirty();
        }
      }
      class av {
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
      class ed {
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
              new ed(this.metadata))
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
              this.matchTNodeWithReadOption(t, n, tA(n, s)),
                this.matchTNodeWithReadOption(t, n, Oo(n, t, s, !1, !1));
            }
          else
            r === hn
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, Oo(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const i = this.metadata.read;
            if (null !== i)
              if (i === qt || i === Jt || (i === hn && 4 & n.type))
                this.addMatch(n.index, -2);
              else {
                const s = Oo(n, t, i, !1, !1);
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
      function tA(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function rA(e, t, n, r) {
        return -1 === n
          ? (function nA(e, t) {
              return 11 & e.type ? Xr(e, t) : 4 & e.type ? va(e, t) : null;
            })(t, e)
          : -2 === n
          ? (function iA(e, t, n) {
              return n === qt
                ? Xr(t, e)
                : n === hn
                ? va(t, e)
                : n === Jt
                ? ov(t, e)
                : void 0;
            })(e, t, r)
          : Gi(e, e[1], n, t);
      }
      function lv(e, t, n, r) {
        const i = t[19].queries[r];
        if (null === i.matches) {
          const s = e.data,
            o = n.matches,
            a = [];
          for (let l = 0; l < o.length; l += 2) {
            const u = o[l];
            a.push(u < 0 ? null : rA(t, s[u], o[l + 1], n.metadata.read));
          }
          i.matches = a;
        }
        return i.matches;
      }
      function td(e, t, n, r) {
        const i = e.queries.getByIndex(n),
          s = i.matches;
        if (null !== s) {
          const o = lv(e, t, i, n);
          for (let a = 0; a < s.length; a += 2) {
            const l = s[a];
            if (l > 0) r.push(o[a / 2]);
            else {
              const u = s[a + 1],
                c = t[-l];
              for (let d = 10; d < c.length; d++) {
                const f = c[d];
                f[17] === f[3] && td(f[1], f, u, r);
              }
              if (null !== c[9]) {
                const d = c[9];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  td(h[1], h, u, r);
                }
              }
            }
          }
        }
        return r;
      }
      function Un(e) {
        const t = v(),
          n = Y(),
          r = Oh();
        au(r + 1);
        const i = fv(n, r);
        if (e.dirty && Ih(t) === (2 == (2 & i.metadata.flags))) {
          if (null === i.matches) e.reset([]);
          else {
            const s = i.crossesNgTemplate ? td(n, t, r, []) : lv(n, t, i, r);
            e.reset(s, uS), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function mr(e, t, n, r) {
        const i = Y();
        if (i.firstCreatePass) {
          const s = Re();
          dv(i, new av(t, n, r), s.index),
            (function oA(e, t) {
              const n = e.contentQueries || (e.contentQueries = []);
              t !== (n.length ? n[n.length - 1] : -1) &&
                n.push(e.queries.length - 1, t);
            })(i, e),
            2 == (2 & n) && (i.staticContentQueries = !0);
        }
        cv(i, v(), n);
      }
      function zn() {
        return (function sA(e, t) {
          return e[19].queries[t].queryList;
        })(v(), Oh());
      }
      function cv(e, t, n) {
        const r = new Qc(4 == (4 & n));
        Wg(e, t, r, r.destroy),
          null === t[19] && (t[19] = new Jc()),
          t[19].queries.push(new Zc(r));
      }
      function dv(e, t, n) {
        null === e.queries && (e.queries = new Xc()),
          e.queries.track(new ed(t, n));
      }
      function fv(e, t) {
        return e.queries.getByIndex(t);
      }
      function hv(e, t) {
        return va(e, t);
      }
      function Da(...e) {}
      const wa = new V("Application Initializer");
      let Ea = (() => {
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
                else if (Dm(s)) {
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
            return new (n || e)(I(wa, 8));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Ms = new V("AppId", {
        providedIn: "root",
        factory: function xv() {
          return `${od()}${od()}${od()}`;
        },
      });
      function od() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Pv = new V("Platform Initializer"),
        Ov = new V("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        Fv = new V("appBootstrapListener"),
        Lv = new V("AnimationModuleType");
      let TA = (() => {
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
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const Sn = new V("LocaleId", {
        providedIn: "root",
        factory: () =>
          be(Sn, P.Optional | P.SkipSelf) ||
          (function IA() {
            return (typeof $localize < "u" && $localize.locale) || _i;
          })(),
      });
      class AA {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let ad = (() => {
        class e {
          compileModuleSync(n) {
            return new Wc(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              s = En(ft(n).declarations).reduce((o, a) => {
                const l = ie(a);
                return l && o.push(new gs(l)), o;
              }, []);
            return new AA(r, s);
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
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const xA = (() => Promise.resolve(0))();
      function ld(e) {
        typeof Zone > "u"
          ? xA.then(() => {
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
            (i.nativeRequestAnimationFrame = (function PA() {
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
            (function LA(e) {
              const t = () => {
                !(function FA(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(le, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                cd(e),
                                (e.isCheckStableRunning = !0),
                                ud(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    cd(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, i, s, o, a) => {
                  try {
                    return jv(e), n.invokeTask(i, s, o, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === s.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Bv(e);
                  }
                },
                onInvoke: (n, r, i, s, o, a, l) => {
                  try {
                    return jv(e), n.invoke(i, s, o, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), Bv(e);
                  }
                },
                onHasTask: (n, r, i, s) => {
                  n.hasTask(i, s),
                    r === i &&
                      ("microTask" == s.change
                        ? ((e._hasPendingMicrotasks = s.microTask),
                          cd(e),
                          ud(e))
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
            o = s.scheduleEventTask("NgZoneEvent: " + i, t, OA, Da, Da);
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
      const OA = {};
      function ud(e) {
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
      function cd(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function jv(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Bv(e) {
        e._nesting--, ud(e);
      }
      class kA {
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
      const $v = new V(""),
        Ca = new V("");
      let hd,
        dd = (() => {
          class e {
            constructor(n, r, i) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                hd ||
                  ((function VA(e) {
                    hd = e;
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
                        ld(() => {
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
                ld(() => {
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
              return new (n || e)(I(Se), I(fd), I(Ca));
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        fd = (() => {
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
              return hd?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = k({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        Wn = null;
      const Hv = new V("AllowMultipleToken"),
        pd = new V("PlatformDestroyListeners");
      class Uv {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function Wv(e, t, n = []) {
        const r = `Platform: ${t}`,
          i = new V(r);
        return (s = []) => {
          let o = gd();
          if (!o || o.injector.get(Hv, !1)) {
            const a = [...n, ...s, { provide: i, useValue: !0 }];
            e
              ? e(a)
              : (function $A(e) {
                  if (Wn && !Wn.get(Hv, !1)) throw new D(400, !1);
                  Wn = e;
                  const t = e.get(qv);
                  (function zv(e) {
                    const t = e.get(Pv, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function Gv(e = [], t) {
                    return Nt.create({
                      name: t,
                      providers: [
                        { provide: Pu, useValue: "platform" },
                        { provide: pd, useValue: new Set([() => (Wn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function UA(e) {
            const t = gd();
            if (!t) throw new D(401, !1);
            return t;
          })();
        };
      }
      function gd() {
        return Wn?.get(qv) ?? null;
      }
      let qv = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const i = (function Qv(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new kA()
                      : ("zone.js" === e ? void 0 : e) || new Se(t)),
                  n
                );
              })(
                r?.ngZone,
                (function Kv(e) {
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
                (function Yv(e, t, n) {
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
                  const u = a.injector.get(Ea);
                  return (
                    u.runInitializers(),
                    u.donePromise.then(
                      () => (
                        (function my(e) {
                          dt(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (gy = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(Sn, _i) || _i),
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
            const i = Zv({}, r);
            return (function jA(e, t, n) {
              const r = new Wc(n);
              return Promise.resolve(r);
            })(0, 0, n).then((s) => this.bootstrapModuleFactory(s, i));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(As);
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
            const n = this._injector.get(pd, null);
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
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function Zv(e, t) {
        return Array.isArray(t) ? t.reduce(Zv, e) : { ...e, ...t };
      }
      let As = (() => {
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
            const s = new Ee((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              o = new Ee((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    Se.assertNotInAngularZone(),
                      ld(() => {
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
            this.isStable = (function ME(...e) {
              let t = Number.POSITIVE_INFINITY,
                n = null,
                r = e[e.length - 1];
              return (
                oo(r)
                  ? ((n = e.pop()),
                    e.length > 1 &&
                      "number" == typeof e[e.length - 1] &&
                      (t = e.pop()))
                  : "number" == typeof r && (t = e.pop()),
                null === n && 1 === e.length && e[0] instanceof Ee
                  ? e[0]
                  : xr(t)(Vl(e, n))
              );
            })(
              s,
              o.pipe(
                (function kE() {
                  return (e) =>
                    fo()(
                      (function OE(e, t) {
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
                            return r.lift(new FE(i, t));
                          const s = Object.create(r, NE);
                          return (s.source = r), (s.subjectFactory = i), s;
                        };
                      })(LE)(e)
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
            const i = n instanceof kp;
            if (!this._injector.get(Ea).done)
              throw (
                (!i &&
                  (function Or(e) {
                    const t = ie(e) || Xe(e) || et(e);
                    return null !== t && t.standalone;
                  })(n),
                new D(405, false))
              );
            let o;
            (o = i ? n : this._injector.get(ls).resolveComponentFactory(n)),
              this.componentTypes.push(o.componentType);
            const a = (function BA(e) {
                return e.isBoundToModule;
              })(o)
                ? void 0
                : this._injector.get(gr),
              u = o.create(Nt.NULL, [], r || o.selector, a),
              c = u.location.nativeElement,
              d = u.injector.get($v, null);
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
                .get(Fv, [])
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
            return new (n || e)(I(Se), I(Bn), I(ei));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function ba(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Xv = !0,
        Sa = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = GA), e;
        })();
      function GA(e) {
        return (function qA(e, t, n) {
          if (wo(e) && !n) {
            const r = pt(e.index, t);
            return new ps(r, r);
          }
          return 47 & e.type ? new ps(t[16], t) : null;
        })(Re(), v(), 16 == (16 & e));
      }
      class i_ {
        constructor() {}
        supports(t) {
          return ms(t);
        }
        create(t) {
          return new XA(t);
        }
      }
      const JA = (e, t) => t;
      class XA {
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
            (this._trackByFn = t || JA);
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
            const o = !r || (n && n.currentIndex < o_(r, i, s)) ? n : r,
              a = o_(o, i, s),
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
          if ((null == t && (t = []), !ms(t))) throw new D(900, !1);
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
              (function N0(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[dr()]();
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
              : (t = this._addAfter(new eR(n, r), s, i)),
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
            null === this._linkedRecords && (this._linkedRecords = new s_()),
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
              (this._unlinkedRecords = new s_()),
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
      class eR {
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
      class tR {
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
      class s_ {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new tR()), this.map.set(n, r)), r.add(t);
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
      function o_(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let i = 0;
        return n && r < n.length && (i = n[r]), r + t + i;
      }
      class a_ {
        constructor() {}
        supports(t) {
          return t instanceof Map || Pc(t);
        }
        create() {
          return new nR();
        }
      }
      class nR {
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
            if (!(t instanceof Map || Pc(t))) throw new D(900, !1);
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
          const r = new rR(t);
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
      class rR {
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
      function l_() {
        return new Ma([new i_()]);
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
              useFactory: (r) => e.create(n, r || l_()),
              deps: [[e, new ts(), new es()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (null != r) return r;
            throw new D(901, !1);
          }
        }
        return (e.ɵprov = k({ token: e, providedIn: "root", factory: l_ })), e;
      })();
      function u_() {
        return new Rs([new a_()]);
      }
      let Rs = (() => {
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
              useFactory: (r) => e.create(n, r || u_()),
              deps: [[e, new ts(), new es()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (r) return r;
            throw new D(901, !1);
          }
        }
        return (e.ɵprov = k({ token: e, providedIn: "root", factory: u_ })), e;
      })();
      const oR = Wv(null, "core", []);
      let aR = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(As));
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({})),
            e
          );
        })(),
        Aa = null;
      function Gn() {
        return Aa;
      }
      const Fe = new V("DocumentToken");
      let Dd = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = k({
            token: e,
            factory: function () {
              return (function dR() {
                return I(c_);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const fR = new V("Location Initialized");
      let c_ = (() => {
        class e extends Dd {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Gn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = Gn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = Gn().getGlobalEventTarget(this._doc, "window");
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
            d_() ? this._history.pushState(n, r, i) : (this.location.hash = i);
          }
          replaceState(n, r, i) {
            d_()
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
            return new (n || e)(I(Fe));
          }),
          (e.ɵprov = k({
            token: e,
            factory: function () {
              return (function hR() {
                return new c_(I(Fe));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function d_() {
        return !!window.history.pushState;
      }
      function wd(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function f_(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function In(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let vr = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = k({
            token: e,
            factory: function () {
              return be(p_);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const h_ = new V("appBaseHref");
      let p_ = (() => {
          class e extends vr {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  be(Fe).location?.origin ??
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
              return wd(this._baseHref, n);
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
              return new (n || e)(I(Dd), I(h_, 8));
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        pR = (() => {
          class e extends vr {
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
              const r = wd(this._baseHref, n);
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
              return new (n || e)(I(Dd), I(h_, 8));
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac })),
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
              (this._baseHref = f_(g_(r))),
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
                (function mR(e, t) {
                  return e && t.startsWith(e) ? t.substring(e.length) : t;
                })(this._baseHref, g_(n))
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
            (e.joinWithSlash = wd),
            (e.stripTrailingSlash = f_),
            (e.ɵfac = function (n) {
              return new (n || e)(I(vr));
            }),
            (e.ɵprov = k({
              token: e,
              factory: function () {
                return (function gR() {
                  return new Ed(I(vr));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function g_(e) {
        return e.replace(/\/index.html$/, "");
      }
      let ja = (() => {
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
                (ms(this._rawClass)
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
                  `NgClass can only toggle CSS classes expressed as strings, got ${ae(
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
            return new (n || e)(T(Ma), T(Rs), T(qt), T(Wo));
          }),
          (e.ɵdir = Ve({
            type: e,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            standalone: !0,
          })),
          e
        );
      })();
      class tN {
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
      let Ba = (() => {
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
                  new tN(i.item, this._ngForOf, -1, -1),
                  null === o ? void 0 : o
                );
              else if (null == o) r.remove(null === s ? void 0 : s);
              else if (null !== s) {
                const a = r.get(s);
                r.move(a, o), T_(a, i);
              }
            });
            for (let i = 0, s = r.length; i < s; i++) {
              const a = r.get(i).context;
              (a.index = i), (a.count = s), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((i) => {
              T_(r.get(i.currentIndex), i);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(Jt), T(hn), T(Ma));
          }),
          (e.ɵdir = Ve({
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
      function T_(e, t) {
        e.context.$implicit = t.item;
      }
      let $a = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new rN()),
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
            I_("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            I_("ngIfElse", n),
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
            return new (n || e)(T(Jt), T(hn));
          }),
          (e.ɵdir = Ve({
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
      class rN {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function I_(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${ae(t)}'.`
          );
      }
      let Od = (() => {
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
              return new (n || e)(T(qt), T(Rs), T(Wo));
            }),
            (e.ɵdir = Ve({
              type: e,
              selectors: [["", "ngStyle", ""]],
              inputs: { ngStyle: "ngStyle" },
              standalone: !0,
            })),
            e
          );
        })(),
        Fd = (() => {
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
              return new (n || e)(T(Jt));
            }),
            (e.ɵdir = Ve({
              type: e,
              selectors: [["", "ngTemplateOutlet", ""]],
              inputs: {
                ngTemplateOutletContext: "ngTemplateOutletContext",
                ngTemplateOutlet: "ngTemplateOutlet",
                ngTemplateOutletInjector: "ngTemplateOutletInjector",
              },
              standalone: !0,
              features: [Ln],
            })),
            e
          );
        })(),
        qn = (() => {
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
      let NN = (() => {
        class e {}
        return (
          (e.ɵprov = k({
            token: e,
            providedIn: "root",
            factory: () => new xN(I(Fe), window),
          })),
          e
        );
      })();
      class xN {
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
          const n = (function PN(e, t) {
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
              N_(this.window.history) ||
              N_(Object.getPrototypeOf(this.window.history));
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
      function N_(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class Bd extends class JN extends class cR {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function uR(e) {
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
          const n = (function XN() {
            return (
              (Os = Os || document.querySelector("base")),
              Os ? Os.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function ex(e) {
                (Ua = Ua || document.createElement("a")),
                  Ua.setAttribute("href", e);
                const t = Ua.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Os = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function XR(e, t) {
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
      let Ua,
        Os = null;
      const F_ = new V("TRANSITION_ID"),
        nx = [
          {
            provide: wa,
            useFactory: function tx(e, t, n) {
              return () => {
                n.get(Ea).donePromise.then(() => {
                  const r = Gn(),
                    i = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let s = 0; s < i.length; s++) r.remove(i[s]);
                });
              };
            },
            deps: [F_, Fe, Nt],
            multi: !0,
          },
        ];
      let ix = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const za = new V("EventManagerPlugins");
      let Wa = (() => {
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
            return new (n || e)(I(za), I(Se));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class L_ {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const i = Gn().getGlobalEventTarget(this._doc, t);
          if (!i)
            throw new Error(`Unsupported event target ${i} for event ${n}`);
          return this.addEventListener(i, n, r);
        }
      }
      let k_ = (() => {
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
            (e.ɵprov = k({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Fs = (() => {
          class e extends k_ {
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
              r && r.forEach(V_), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, i) => {
                this._addStylesToHost(n, i, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(V_));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(Fe));
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function V_(e) {
        Gn().remove(e);
      }
      const $d = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Hd = /%COMP%/g;
      function Ga(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let i = t[r];
          Array.isArray(i) ? Ga(e, i, n) : ((i = i.replace(Hd, e)), n.push(i));
        }
        return n;
      }
      function $_(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let qa = (() => {
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
              case Ut.Emulated: {
                let i = this.rendererByCompId.get(r.id);
                return (
                  i ||
                    ((i = new cx(
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
              case Ut.ShadowDom:
                return new dx(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const i = Ga(r.id, r.styles, []);
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
            return new (n || e)(I(Wa), I(Fs), I(Ms));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
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
            ? document.createElementNS($d[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (U_(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (U_(t) ? t.content : t).insertBefore(n, r);
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
            const s = $d[i];
            s ? t.setAttributeNS(s, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const i = $d[r];
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
            ? this.eventManager.addGlobalEventListener(t, n, $_(r))
            : this.eventManager.addEventListener(t, n, $_(r));
        }
      }
      function U_(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class cx extends Ud {
        constructor(t, n, r, i) {
          super(t), (this.component = r);
          const s = Ga(i + "-" + r.id, r.styles, []);
          n.addStyles(s),
            (this.contentAttr = (function ax(e) {
              return "_ngcontent-%COMP%".replace(Hd, e);
            })(i + "-" + r.id)),
            (this.hostAttr = (function lx(e) {
              return "_nghost-%COMP%".replace(Hd, e);
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
      class dx extends Ud {
        constructor(t, n, r, i) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = Ga(i.id, i.styles, []);
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
      let fx = (() => {
        class e extends L_ {
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
            return new (n || e)(I(Fe));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const z_ = ["alt", "control", "meta", "shift"],
        hx = {
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
        px = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let gx = (() => {
        class e extends L_ {
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
              .runOutsideAngular(() => Gn().onAndCancel(n, s.domEventName, o));
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
              z_.forEach((u) => {
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
            let i = hx[n.key] || n.key,
              s = "";
            return (
              r.indexOf("code.") > -1 && ((i = n.code), (s = "code.")),
              !(null == i || !i) &&
                ((i = i.toLowerCase()),
                " " === i ? (i = "space") : "." === i && (i = "dot"),
                z_.forEach((o) => {
                  o !== i && (0, px[o])(n) && (s += o + ".");
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
            return new (n || e)(I(Fe));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const G_ = [
          { provide: Ov, useValue: "browser" },
          {
            provide: Pv,
            useValue: function mx() {
              Bd.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Fe,
            useFactory: function vx() {
              return (
                (function Db(e) {
                  Cu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ],
        _x = Wv(oR, "browser", G_),
        q_ = new V(""),
        K_ = [
          {
            provide: Ca,
            useClass: class rx {
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
                        ? Gn().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: $v, useClass: dd, deps: [Se, fd, Ca] },
          { provide: dd, useClass: dd, deps: [Se, fd, Ca] },
        ],
        Q_ = [
          { provide: Pu, useValue: "root" },
          {
            provide: ei,
            useFactory: function yx() {
              return new ei();
            },
            deps: [],
          },
          { provide: za, useClass: fx, multi: !0, deps: [Fe, Se, Ov] },
          { provide: za, useClass: gx, multi: !0, deps: [Fe] },
          { provide: qa, useClass: qa, deps: [Wa, Fs, Ms] },
          { provide: us, useExisting: qa },
          { provide: k_, useExisting: Fs },
          { provide: Fs, useClass: Fs, deps: [Fe] },
          { provide: Wa, useClass: Wa, deps: [za, Se] },
          { provide: class ON {}, useClass: ix, deps: [] },
          [],
        ];
      let Y_ = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: Ms, useValue: n.appId },
                  { provide: F_, useExisting: Ms },
                  nx,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(q_, 12));
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ providers: [...Q_, ...K_], imports: [qn, aR] })),
            e
          );
        })(),
        Z_ = (() => {
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
              return new (n || e)(I(Fe));
            }),
            (e.ɵprov = k({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function wx() {
                        return new Z_(I(Fe));
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
      let eD = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = k({
              token: e,
              factory: function (n) {
                let r = null;
                return (r = n ? new (n || e)() : I(tD)), r;
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        tD = (() => {
          class e extends eD {
            constructor(n) {
              super(), (this._doc = n);
            }
            sanitize(n, r) {
              if (null == r) return null;
              switch (n) {
                case de.NONE:
                  return r;
                case de.HTML:
                  return an(r, "HTML")
                    ? yt(r)
                    : Sp(this._doc, String(r)).toString();
                case de.STYLE:
                  return an(r, "Style") ? yt(r) : r;
                case de.SCRIPT:
                  if (an(r, "Script")) return yt(r);
                  throw new Error("unsafe value used in a script context");
                case de.URL:
                  return an(r, "URL") ? yt(r) : is(String(r));
                case de.RESOURCE_URL:
                  if (an(r, "ResourceURL")) return yt(r);
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
              return (function Ab(e) {
                return new Cb(e);
              })(n);
            }
            bypassSecurityTrustStyle(n) {
              return (function Rb(e) {
                return new bb(e);
              })(n);
            }
            bypassSecurityTrustScript(n) {
              return (function Nb(e) {
                return new Sb(e);
              })(n);
            }
            bypassSecurityTrustUrl(n) {
              return (function xb(e) {
                return new Tb(e);
              })(n);
            }
            bypassSecurityTrustResourceUrl(n) {
              return (function Pb(e) {
                return new Ib(e);
              })(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(Fe));
            }),
            (e.ɵprov = k({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function Mx(e) {
                        return new tD(e.get(Fe));
                      })(I(Nt))),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class nD {}
      const An = "*";
      function Rx(e, t) {
        return { type: 7, name: e, definitions: t, options: {} };
      }
      function rD(e, t = null) {
        return { type: 4, styles: t, timings: e };
      }
      function iD(e, t = null) {
        return { type: 2, steps: e, options: t };
      }
      function Ls(e) {
        return { type: 6, styles: e, offset: null };
      }
      function Nx(e, t, n) {
        return { type: 0, name: e, styles: t, options: n };
      }
      function sD(e, t, n = null) {
        return { type: 1, expr: e, animation: t, options: n };
      }
      function oD(e) {
        Promise.resolve(null).then(e);
      }
      class ks {
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
          oD(() => this._onFinish());
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
      class aD {
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
            ? oD(() => this._onFinish())
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
      function lD(e) {
        return new D(3e3, !1);
      }
      function fP() {
        return typeof window < "u" && typeof window.document < "u";
      }
      function qd() {
        return (
          typeof process < "u" &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function Qn(e) {
        switch (e.length) {
          case 0:
            return new ks();
          case 1:
            return e[0];
          default:
            return new aD(e);
        }
      }
      function uD(e, t, n, r, i = new Map(), s = new Map()) {
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
          throw (function eP(e) {
            return new D(3502, !1);
          })();
        return a;
      }
      function Kd(e, t, n, r) {
        switch (t) {
          case "start":
            e.onStart(() => r(n && Qd(n, "start", e)));
            break;
          case "done":
            e.onDone(() => r(n && Qd(n, "done", e)));
            break;
          case "destroy":
            e.onDestroy(() => r(n && Qd(n, "destroy", e)));
        }
      }
      function Qd(e, t, n) {
        const s = Yd(
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
      function Yd(e, t, n, r, i = "", s = 0, o) {
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
      function Dt(e, t, n) {
        let r = e.get(t);
        return r || e.set(t, (r = n)), r;
      }
      function cD(e) {
        const t = e.indexOf(":");
        return [e.substring(1, t), e.slice(t + 1)];
      }
      let Zd = (e, t) => !1,
        dD = (e, t, n) => [],
        fD = null;
      function Jd(e) {
        const t = e.parentNode || e.host;
        return t === fD ? null : t;
      }
      (qd() || typeof Element < "u") &&
        (fP()
          ? ((fD = (() => document.documentElement)()),
            (Zd = (e, t) => {
              for (; t; ) {
                if (t === e) return !0;
                t = Jd(t);
              }
              return !1;
            }))
          : (Zd = (e, t) => e.contains(t)),
        (dD = (e, t, n) => {
          if (n) return Array.from(e.querySelectorAll(t));
          const r = e.querySelector(t);
          return r ? [r] : [];
        }));
      let _r = null,
        hD = !1;
      const pD = Zd,
        gD = dD;
      let mD = (() => {
          class e {
            validateStyleProperty(n) {
              return (function pP(e) {
                _r ||
                  ((_r =
                    (function gP() {
                      return typeof document < "u" ? document.body : null;
                    })() || {}),
                  (hD = !!_r.style && "WebkitAppearance" in _r.style));
                let t = !0;
                return (
                  _r.style &&
                    !(function hP(e) {
                      return "ebkit" == e.substring(1, 6);
                    })(e) &&
                    ((t = e in _r.style),
                    !t &&
                      hD &&
                      (t =
                        "Webkit" + e.charAt(0).toUpperCase() + e.slice(1) in
                        _r.style)),
                  t
                );
              })(n);
            }
            matchesElement(n, r) {
              return !1;
            }
            containsElement(n, r) {
              return pD(n, r);
            }
            getParentElement(n) {
              return Jd(n);
            }
            query(n, r, i) {
              return gD(n, r, i);
            }
            computeStyle(n, r, i) {
              return i || "";
            }
            animate(n, r, i, s, o, a = [], l) {
              return new ks(i, s);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Xd = (() => {
          class e {}
          return (e.NOOP = new mD()), e;
        })();
      const ef = "ng-enter",
        Ka = "ng-leave",
        Qa = "ng-trigger",
        Ya = ".ng-trigger",
        vD = "ng-animating",
        tf = ".ng-animating";
      function Yn(e) {
        if ("number" == typeof e) return e;
        const t = e.match(/^(-?[\.\d]+)(m?s)/);
        return !t || t.length < 2 ? 0 : nf(parseFloat(t[1]), t[2]);
      }
      function nf(e, t) {
        return "s" === t ? 1e3 * e : e;
      }
      function Za(e, t, n) {
        return e.hasOwnProperty("duration")
          ? e
          : (function vP(e, t, n) {
              let i,
                s = 0,
                o = "";
              if ("string" == typeof e) {
                const a = e.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return t.push(lD()), { duration: 0, delay: 0, easing: "" };
                i = nf(parseFloat(a[1]), a[2]);
                const l = a[3];
                null != l && (s = nf(parseFloat(l), a[4]));
                const u = a[5];
                u && (o = u);
              } else i = e;
              if (!n) {
                let a = !1,
                  l = t.length;
                i < 0 &&
                  (t.push(
                    (function xx() {
                      return new D(3100, !1);
                    })()
                  ),
                  (a = !0)),
                  s < 0 &&
                    (t.push(
                      (function Px() {
                        return new D(3101, !1);
                      })()
                    ),
                    (a = !0)),
                  a && t.splice(l, 0, lD());
              }
              return { duration: i, delay: s, easing: o };
            })(e, t, n);
      }
      function Vs(e, t = {}) {
        return (
          Object.keys(e).forEach((n) => {
            t[n] = e[n];
          }),
          t
        );
      }
      function _D(e) {
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
      function wD(e, t, n) {
        return n ? t + ":" + n + ";" : "";
      }
      function ED(e) {
        let t = "";
        for (let n = 0; n < e.style.length; n++) {
          const r = e.style.item(n);
          t += wD(0, r, e.style.getPropertyValue(r));
        }
        for (const n in e.style)
          e.style.hasOwnProperty(n) &&
            !n.startsWith("_") &&
            (t += wD(0, EP(n), e.style[n]));
        e.setAttribute("style", t);
      }
      function pn(e, t, n) {
        e.style &&
          (t.forEach((r, i) => {
            const s = sf(i);
            n && !n.has(i) && n.set(i, e.style[s]), (e.style[s] = r);
          }),
          qd() && ED(e));
      }
      function Dr(e, t) {
        e.style &&
          (t.forEach((n, r) => {
            const i = sf(r);
            e.style[i] = "";
          }),
          qd() && ED(e));
      }
      function js(e) {
        return Array.isArray(e) ? (1 == e.length ? e[0] : iD(e)) : e;
      }
      const rf = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function CD(e) {
        let t = [];
        if ("string" == typeof e) {
          let n;
          for (; (n = rf.exec(e)); ) t.push(n[1]);
          rf.lastIndex = 0;
        }
        return t;
      }
      function Ja(e, t, n) {
        const r = e.toString(),
          i = r.replace(rf, (s, o) => {
            let a = t[o];
            return (
              null == a &&
                (n.push(
                  (function Fx(e) {
                    return new D(3003, !1);
                  })()
                ),
                (a = "")),
              a.toString()
            );
          });
        return i == r ? e : i;
      }
      function Xa(e) {
        const t = [];
        let n = e.next();
        for (; !n.done; ) t.push(n.value), (n = e.next());
        return t;
      }
      const wP = /-+([a-z0-9])/g;
      function sf(e) {
        return e.replace(wP, (...t) => t[1].toUpperCase());
      }
      function EP(e) {
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
            throw (function Lx(e) {
              return new D(3004, !1);
            })();
        }
      }
      function bD(e, t) {
        return window.getComputedStyle(e)[t];
      }
      function MP(e, t) {
        const n = [];
        return (
          "string" == typeof e
            ? e.split(/\s*,\s*/).forEach((r) =>
                (function AP(e, t, n) {
                  if (":" == e[0]) {
                    const l = (function RP(e, t) {
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
                              (function Yx(e) {
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
                        (function Qx(e) {
                          return new D(3015, !1);
                        })()
                      ),
                      t
                    );
                  const i = r[1],
                    s = r[2],
                    o = r[3];
                  t.push(SD(i, o));
                  "<" == s[0] && !("*" == i && "*" == o) && t.push(SD(o, i));
                })(r, n, t)
              )
            : n.push(e),
          n
        );
      }
      const rl = new Set(["true", "1"]),
        il = new Set(["false", "0"]);
      function SD(e, t) {
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
      const NP = new RegExp("s*:selfs*,?", "g");
      function af(e, t, n, r) {
        return new xP(e).build(t, n, r);
      }
      class xP {
        constructor(t) {
          this._driver = t;
        }
        build(t, n, r) {
          const i = new FP(n);
          return this._resetContextStyleTimingState(i), wt(this, js(t), i);
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
                (function Vx() {
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
                  (function jx() {
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
                  CD(l).forEach((u) => {
                    o.hasOwnProperty(u) || s.add(u);
                  });
                });
            }),
              s.size &&
                (Xa(s.values()),
                n.errors.push(
                  (function Bx(e, t) {
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
          const r = wt(this, js(t.animation), n);
          return {
            type: 1,
            matchers: MP(t.expr, n.errors),
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
          const r = (function kP(e, t) {
            if (e.hasOwnProperty("duration")) return e;
            if ("number" == typeof e) return lf(Za(e, t).duration, 0, "");
            const n = e;
            if (
              n
                .split(/\s+/)
                .some((s) => "{" == s.charAt(0) && "{" == s.charAt(1))
            ) {
              const s = lf(0, 0, "");
              return (s.dynamic = !0), (s.strValue = n), s;
            }
            const i = Za(n, t);
            return lf(i.duration, i.delay, i.easing);
          })(t.timings, n.errors);
          n.currentAnimateTimings = r;
          let i,
            s = t.styles ? t.styles : Ls({});
          if (5 == s.type) i = this.visitKeyframes(s, n);
          else {
            let o = t.styles,
              a = !1;
            if (!o) {
              a = !0;
              const u = {};
              r.easing && (u.easing = r.easing), (o = Ls(u));
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
              : r.push(_D(a));
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
                        (function Hx(e, t, n, r, i) {
                          return new D(3010, !1);
                        })()
                      ),
                      (d = !1)),
                    (s = c.startTime)),
                    d && u.set(l, { startTime: s, endTime: i }),
                    n.options &&
                      (function DP(e, t, n) {
                        const r = t.params || {},
                          i = CD(e);
                        i.length &&
                          i.forEach((s) => {
                            r.hasOwnProperty(s) ||
                              n.push(
                                (function Ox(e) {
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
                (function Ux() {
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
            const w = this._makeStyleAst(_, n);
            let y =
                null != w.offset
                  ? w.offset
                  : (function LP(e) {
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
                    })(w.styles),
              E = 0;
            return (
              null != y && (s++, (E = w.offset = y)),
              (l = l || E < 0 || E > 1),
              (a = a || E < u),
              (u = E),
              o.push(E),
              w
            );
          });
          l &&
            n.errors.push(
              (function zx() {
                return new D(3012, !1);
              })()
            ),
            a &&
              n.errors.push(
                (function Wx() {
                  return new D(3200, !1);
                })()
              );
          const d = t.steps.length;
          let f = 0;
          s > 0 && s < d
            ? n.errors.push(
                (function Gx() {
                  return new D(3202, !1);
                })()
              )
            : 0 == s && (f = 1 / (d - 1));
          const h = d - 1,
            p = n.currentTime,
            g = n.currentAnimateTimings,
            m = g.duration;
          return (
            c.forEach((_, w) => {
              const y = f > 0 ? (w == h ? 1 : f * w) : o[w],
                E = y * m;
              (n.currentTime = p + g.delay + E),
                (g.duration = E),
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
            animation: wt(this, js(t.animation), n),
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
          const [s, o] = (function PP(e) {
            const t = !!e.split(/\s*,\s*/).find((n) => ":self" == n);
            return (
              t && (e = e.replace(NP, "")),
              (e = e
                .replace(/@\*/g, Ya)
                .replace(/@\w+/g, (n) => Ya + "-" + n.slice(1))
                .replace(/:animating/g, tf)),
              [e, t]
            );
          })(t.selector);
          (n.currentQuerySelector = r.length ? r + " " + s : s),
            Dt(n.collectedStyles, n.currentQuerySelector, new Map());
          const a = wt(this, js(t.animation), n);
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
              (function qx() {
                return new D(3013, !1);
              })()
            );
          const r =
            "full" === t.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : Za(t.timings, n.errors, !0);
          return {
            type: 12,
            animation: wt(this, js(t.animation), n),
            timings: r,
            options: null,
          };
        }
      }
      class FP {
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
            ? (e = Vs(e)).params &&
              (e.params = (function OP(e) {
                return e ? Vs(e) : null;
              })(e.params))
            : (e = {}),
          e
        );
      }
      function lf(e, t, n) {
        return { duration: e, delay: t, easing: n };
      }
      function uf(e, t, n, r, i, s, o = null, a = !1) {
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
      const BP = new RegExp(":enter", "g"),
        HP = new RegExp(":leave", "g");
      function cf(e, t, n, r, i, s = new Map(), o = new Map(), a, l, u = []) {
        return new UP().buildKeyframes(e, t, n, r, i, s, o, a, l, u);
      }
      class UP {
        buildKeyframes(t, n, r, i, s, o, a, l, u, c = []) {
          u = u || new sl();
          const d = new df(t, n, u, i, s, c, []);
          d.options = l;
          const f = l.delay ? Yn(l.delay) : 0;
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
            : [uf(n, [], [], [], 0, f, "", !1)];
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
            this.visitReference(t.animation, r),
            n.transformIntoNewTimeline(r.currentTimeline.currentTime),
            (n.previousNode = t);
        }
        _visitSubInstructions(t, n, r) {
          let s = n.currentTimeline.currentTime;
          const o = null != r.duration ? Yn(r.duration) : null,
            a = null != r.delay ? Yn(r.delay) : null;
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
            const o = Yn(s.delay);
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
          const s = t.options && t.options.delay ? Yn(t.options.delay) : 0;
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
            return Za(n.params ? Ja(r, n.params, n.errors) : r, n.errors);
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
            s = i.delay ? Yn(i.delay) : 0;
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
      class df {
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
          null != r.duration && (i.duration = Yn(r.duration)),
            null != r.delay && (i.delay = Yn(r.delay));
          const s = r.params;
          if (s) {
            let o = i.params;
            o || (o = this.options.params = {}),
              Object.keys(s).forEach((a) => {
                (!n || !o.hasOwnProperty(a)) &&
                  (o[a] = Ja(s[a], o, this.errors));
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
            s = new df(
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
            s = new zP(
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
            t = (t = t.replace(BP, "." + this._enterClassName)).replace(
              HP,
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
                (function Kx(e) {
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
            o = (function WP(e, t) {
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
            const u = Ja(l, s, r);
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
          const s = t.size ? Xa(t.values()) : [],
            o = n.size ? Xa(n.values()) : [];
          if (r) {
            const a = i[0],
              l = new Map(a);
            a.set("offset", 0), l.set("offset", 1), (i = [a, l]);
          }
          return uf(
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
      class zP extends al {
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
            u.set("offset", MD(a)), s.push(u);
            const c = t.length - 1;
            for (let d = 1; d <= c; d++) {
              let f = Zn(t[d]);
              const h = f.get("offset");
              f.set("offset", MD((n + h * r) / o)), s.push(f);
            }
            (r = o), (n = 0), (i = ""), (t = s);
          }
          return uf(
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
      function MD(e, t = 3) {
        const n = Math.pow(10, t - 1);
        return Math.round(e * n) / n;
      }
      class ff {}
      const GP = new Set([
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
      class qP extends ff {
        normalizePropertyName(t, n) {
          return sf(t);
        }
        normalizeStyleValue(t, n, r, i) {
          let s = "";
          const o = r.toString().trim();
          if (GP.has(n) && 0 !== r && "0" !== r)
            if ("number" == typeof r) s = "px";
            else {
              const a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                i.push(
                  (function kx(e, t) {
                    return new D(3005, !1);
                  })()
                );
            }
          return o + s;
        }
      }
      function AD(e, t, n, r, i, s, o, a, l, u, c, d, f) {
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
      const hf = {};
      class RD {
        constructor(t, n, r) {
          (this._triggerName = t), (this.ast = n), (this._stateStyles = r);
        }
        match(t, n, r, i) {
          return (function KP(e, t, n, r, i) {
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
            f = (this.ast.options && this.ast.options.params) || hf,
            p = this.buildStyles(r, (a && a.params) || hf, d),
            g = (l && l.params) || hf,
            m = this.buildStyles(i, g, d),
            _ = new Set(),
            w = new Map(),
            y = new Map(),
            E = "void" === i,
            j = { params: QP(g, f), delay: this.ast.options?.delay },
            Q = c ? [] : cf(t, n, this.ast.animation, s, o, p, m, j, u, d);
          let ye = 0;
          if (
            (Q.forEach((Ct) => {
              ye = Math.max(Ct.duration + Ct.delay, ye);
            }),
            d.length)
          )
            return AD(n, this._triggerName, r, i, E, p, m, [], [], w, y, ye, d);
          Q.forEach((Ct) => {
            const bt = Ct.element,
              Pi = Dt(w, bt, new Set());
            Ct.preStyleProps.forEach((rn) => Pi.add(rn));
            const Pn = Dt(y, bt, new Set());
            Ct.postStyleProps.forEach((rn) => Pn.add(rn)),
              bt !== n && _.add(bt);
          });
          const Et = Xa(_.values());
          return AD(n, this._triggerName, r, i, E, p, m, Q, Et, w, y, ye);
        }
      }
      function QP(e, t) {
        const n = Vs(t);
        for (const r in e) e.hasOwnProperty(r) && null != e[r] && (n[r] = e[r]);
        return n;
      }
      class YP {
        constructor(t, n, r) {
          (this.styles = t), (this.defaultParams = n), (this.normalizer = r);
        }
        buildStyles(t, n) {
          const r = new Map(),
            i = Vs(this.defaultParams);
          return (
            Object.keys(t).forEach((s) => {
              const o = t[s];
              null !== o && (i[s] = o);
            }),
            this.styles.styles.forEach((s) => {
              "string" != typeof s &&
                s.forEach((o, a) => {
                  o && (o = Ja(o, i, n));
                  const l = this.normalizer.normalizePropertyName(a, n);
                  (o = this.normalizer.normalizeStyleValue(a, l, o, n)),
                    r.set(l, o);
                });
            }),
            r
          );
        }
      }
      class JP {
        constructor(t, n, r) {
          (this.name = t),
            (this.ast = n),
            (this._normalizer = r),
            (this.transitionFactories = []),
            (this.states = new Map()),
            n.states.forEach((i) => {
              this.states.set(
                i.name,
                new YP(i.style, (i.options && i.options.params) || {}, r)
              );
            }),
            ND(this.states, "true", "1"),
            ND(this.states, "false", "0"),
            n.transitions.forEach((i) => {
              this.transitionFactories.push(new RD(t, i, this.states));
            }),
            (this.fallbackTransition = (function XP(e, t, n) {
              return new RD(
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
      function ND(e, t, n) {
        e.has(t)
          ? e.has(n) || e.set(n, e.get(t))
          : e.has(n) && e.set(t, e.get(n));
      }
      const eO = new sl();
      class tO {
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
            s = af(this._driver, n, r, []);
          if (r.length)
            throw (function tP(e) {
              return new D(3503, !1);
            })();
          this._animations.set(t, s);
        }
        _buildPlayer(t, n, r) {
          const i = t.element,
            s = uD(0, this._normalizer, 0, t.keyframes, n, r);
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
              ? ((o = cf(
                  this._driver,
                  n,
                  s,
                  ef,
                  Ka,
                  new Map(),
                  new Map(),
                  r,
                  eO,
                  i
                )),
                o.forEach((c) => {
                  const d = Dt(a, c.element, new Map());
                  c.postStyleProps.forEach((f) => d.set(f, null));
                }))
              : (i.push(
                  (function nP() {
                    return new D(3300, !1);
                  })()
                ),
                (o = [])),
            i.length)
          )
            throw (function rP(e) {
              return new D(3504, !1);
            })();
          a.forEach((c, d) => {
            c.forEach((f, h) => {
              c.set(h, this._driver.computeStyle(d, h, An));
            });
          });
          const u = Qn(
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
            throw (function iP(e) {
              return new D(3301, !1);
            })();
          return n;
        }
        listen(t, n, r, i) {
          const s = Yd(n, "", "", "");
          return Kd(this._getPlayer(t), r, s, i), () => {};
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
      const xD = "ng-animate-queued",
        pf = "ng-animate-disabled",
        oO = [],
        PD = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        aO = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        Lt = "__ng_removed";
      class gf {
        constructor(t, n = "") {
          this.namespaceId = n;
          const r = t && t.hasOwnProperty("value");
          if (
            ((this.value = (function dO(e) {
              return e ?? null;
            })(r ? t.value : t)),
            r)
          ) {
            const s = Vs(t);
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
        mf = new gf(Bs);
      class lO {
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
            throw (function sP(e, t) {
              return new D(3302, !1);
            })();
          if (null == r || 0 == r.length)
            throw (function oP(e) {
              return new D(3303, !1);
            })();
          if (
            !(function fO(e) {
              return "start" == e || "done" == e;
            })(r)
          )
            throw (function aP(e, t) {
              return new D(3400, !1);
            })();
          const s = Dt(this._elementListeners, t, []),
            o = { name: n, phase: r, callback: i };
          s.push(o);
          const a = Dt(this._engine.statesByElement, t, new Map());
          return (
            a.has(n) || (kt(t, Qa), kt(t, Qa + "-" + n), a.set(n, mf)),
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
            throw (function lP(e) {
              return new D(3401, !1);
            })();
          return n;
        }
        trigger(t, n, r, i = !0) {
          const s = this._getTrigger(n),
            o = new yf(this.id, n, t);
          let a = this._engine.statesByElement.get(t);
          a ||
            (kt(t, Qa),
            kt(t, Qa + "-" + n),
            this._engine.statesByElement.set(t, (a = new Map())));
          let l = a.get(n);
          const u = new gf(r, this.id);
          if (
            (!(r && r.hasOwnProperty("value")) &&
              l &&
              u.absorbOptions(l.options),
            a.set(n, u),
            l || (l = mf),
            u.value !== Bs && l.value === u.value)
          ) {
            if (
              !(function gO(e, t) {
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
                    Dr(t, m), pn(t, _);
                  });
            }
            return;
          }
          const f = Dt(this._engine.playersByElement, t, []);
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
              (kt(t, xD),
              o.onStart(() => {
                bi(t, xD);
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
          const r = this._engine.driver.query(t, Ya, !0);
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
                r && Qn(a).onDone(() => this._engine.processLeaveNode(t)),
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
                u = r.get(o) || mf,
                c = new gf(Bs),
                d = new yf(this.id, o, t);
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
            (!s || s === PD) &&
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
                    const l = Yd(
                      s,
                      r.triggerName,
                      r.fromState.value,
                      r.toState.value
                    );
                    (l._data = t), Kd(r.player, a.phase, l, a.callback);
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
      class uO {
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
          const r = new lO(t, n, this);
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
              (this.disabledNodes.add(t), kt(t, pf))
            : this.disabledNodes.has(t) &&
              (this.disabledNodes.delete(t), bi(t, pf));
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
          let n = this.driver.query(t, Ya, !0);
          n.forEach((r) => this.destroyActiveAnimationsForElement(r)),
            0 != this.playersByQueriedElement.size &&
              ((n = this.driver.query(t, tf, !0)),
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
            if (this.players.length) return Qn(this.players).onDone(() => t());
            t();
          });
        }
        processLeaveNode(t) {
          const n = t[Lt];
          if (n && n.setForRemoval) {
            if (((t[Lt] = PD), n.namespaceId)) {
              this.destroyInnerAnimations(t);
              const r = this._fetchNamespace(n.namespaceId);
              r && r.clearElementCache(t);
            }
            this._onRemovalComplete(t, n.setForRemoval);
          }
          t.classList?.contains(pf) && this.markElementAsDisabled(t, !1),
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
                ? Qn(n).onDone(() => {
                    r.forEach((i) => i());
                  })
                : r.forEach((i) => i());
          }
        }
        reportError(t) {
          throw (function uP(e) {
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
            const N = this.driver.query(S, ".ng-animate-queued", !0);
            for (let F = 0; F < N.length; F++) c.add(N[F]);
          });
          const d = this.bodyNode,
            f = Array.from(this.statesByElement.keys()),
            h = LD(f, this.collectedEnterElements),
            p = new Map();
          let g = 0;
          h.forEach((S, N) => {
            const F = ef + g++;
            p.set(N, F), S.forEach((J) => kt(J, F));
          });
          const m = [],
            _ = new Set(),
            w = new Set();
          for (let S = 0; S < this.collectedLeaveElements.length; S++) {
            const N = this.collectedLeaveElements[S],
              F = N[Lt];
            F &&
              F.setForRemoval &&
              (m.push(N),
              _.add(N),
              F.hasAnimation
                ? this.driver
                    .query(N, ".ng-star-inserted", !0)
                    .forEach((J) => _.add(J))
                : w.add(N));
          }
          const y = new Map(),
            E = LD(f, Array.from(_));
          E.forEach((S, N) => {
            const F = Ka + g++;
            y.set(N, F), S.forEach((J) => kt(J, F));
          }),
            t.push(() => {
              h.forEach((S, N) => {
                const F = p.get(N);
                S.forEach((J) => bi(J, F));
              }),
                E.forEach((S, N) => {
                  const F = y.get(N);
                  S.forEach((J) => bi(J, F));
                }),
                m.forEach((S) => {
                  this.processLeaveNode(S);
                });
            });
          const j = [],
            Q = [];
          for (let S = this._namespaceList.length - 1; S >= 0; S--)
            this._namespaceList[S].drainQueuedTransitions(n).forEach((F) => {
              const J = F.player,
                Le = F.element;
              if ((j.push(J), this.collectedEnterElements.length)) {
                const Ye = Le[Lt];
                if (Ye && Ye.setForMove) {
                  if (
                    Ye.previousTriggersValues &&
                    Ye.previousTriggersValues.has(F.triggerName)
                  ) {
                    const Rr = Ye.previousTriggersValues.get(F.triggerName),
                      Bt = this.statesByElement.get(F.element);
                    if (Bt && Bt.has(F.triggerName)) {
                      const Fl = Bt.get(F.triggerName);
                      (Fl.value = Rr), Bt.set(F.triggerName, Fl);
                    }
                  }
                  return void J.destroy();
                }
              }
              const mn = !d || !this.driver.containsElement(d, Le),
                St = y.get(Le),
                tr = p.get(Le),
                ve = this._buildInstruction(F, r, tr, St, mn);
              if (ve.errors && ve.errors.length) return void Q.push(ve);
              if (mn)
                return (
                  J.onStart(() => Dr(Le, ve.fromStyles)),
                  J.onDestroy(() => pn(Le, ve.toStyles)),
                  void i.push(J)
                );
              if (F.isFallbackTransition)
                return (
                  J.onStart(() => Dr(Le, ve.fromStyles)),
                  J.onDestroy(() => pn(Le, ve.toStyles)),
                  void i.push(J)
                );
              const uE = [];
              ve.timelines.forEach((Ye) => {
                (Ye.stretchStartingKeyframe = !0),
                  this.disabledNodes.has(Ye.element) || uE.push(Ye);
              }),
                (ve.timelines = uE),
                r.append(Le, ve.timelines),
                o.push({ instruction: ve, player: J, element: Le }),
                ve.queriedElements.forEach((Ye) => Dt(a, Ye, []).push(J)),
                ve.preStyleProps.forEach((Ye, Rr) => {
                  if (Ye.size) {
                    let Bt = l.get(Rr);
                    Bt || l.set(Rr, (Bt = new Set())),
                      Ye.forEach((Fl, nh) => Bt.add(nh));
                  }
                }),
                ve.postStyleProps.forEach((Ye, Rr) => {
                  let Bt = u.get(Rr);
                  Bt || u.set(Rr, (Bt = new Set())),
                    Ye.forEach((Fl, nh) => Bt.add(nh));
                });
            });
          if (Q.length) {
            const S = [];
            Q.forEach((N) => {
              S.push(
                (function cP(e, t) {
                  return new D(3505, !1);
                })()
              );
            }),
              j.forEach((N) => N.destroy()),
              this.reportError(S);
          }
          const ye = new Map(),
            Et = new Map();
          o.forEach((S) => {
            const N = S.element;
            r.has(N) &&
              (Et.set(N, N),
              this._beforeAnimationBuild(
                S.player.namespaceId,
                S.instruction,
                ye
              ));
          }),
            i.forEach((S) => {
              const N = S.element;
              this._getPreviousPlayers(
                N,
                !1,
                S.namespaceId,
                S.triggerName,
                null
              ).forEach((J) => {
                Dt(ye, N, []).push(J), J.destroy();
              });
            });
          const Ct = m.filter((S) => VD(S, l, u)),
            bt = new Map();
          FD(bt, this.driver, w, u, An).forEach((S) => {
            VD(S, l, u) && Ct.push(S);
          });
          const Pn = new Map();
          h.forEach((S, N) => {
            FD(Pn, this.driver, new Set(S), l, "!");
          }),
            Ct.forEach((S) => {
              const N = bt.get(S),
                F = Pn.get(S);
              bt.set(
                S,
                new Map([
                  ...Array.from(N?.entries() ?? []),
                  ...Array.from(F?.entries() ?? []),
                ])
              );
            });
          const rn = [],
            Oi = [],
            Fi = {};
          o.forEach((S) => {
            const { element: N, player: F, instruction: J } = S;
            if (r.has(N)) {
              if (c.has(N))
                return (
                  F.onDestroy(() => pn(N, J.toStyles)),
                  (F.disabled = !0),
                  F.overrideTotalTime(J.totalTime),
                  void i.push(F)
                );
              let Le = Fi;
              if (Et.size > 1) {
                let St = N;
                const tr = [];
                for (; (St = St.parentNode); ) {
                  const ve = Et.get(St);
                  if (ve) {
                    Le = ve;
                    break;
                  }
                  tr.push(St);
                }
                tr.forEach((ve) => Et.set(ve, Le));
              }
              const mn = this._buildAnimation(F.namespaceId, J, ye, s, Pn, bt);
              if ((F.setRealPlayer(mn), Le === Fi)) rn.push(F);
              else {
                const St = this.playersByElement.get(Le);
                St && St.length && (F.parentPlayer = Qn(St)), i.push(F);
              }
            } else
              Dr(N, J.fromStyles),
                F.onDestroy(() => pn(N, J.toStyles)),
                Oi.push(F),
                c.has(N) && i.push(F);
          }),
            Oi.forEach((S) => {
              const N = s.get(S.element);
              if (N && N.length) {
                const F = Qn(N);
                S.setRealPlayer(F);
              }
            }),
            i.forEach((S) => {
              S.parentPlayer ? S.syncPlayerEvents(S.parentPlayer) : S.destroy();
            });
          for (let S = 0; S < m.length; S++) {
            const N = m[S],
              F = N[Lt];
            if ((bi(N, Ka), F && F.hasAnimation)) continue;
            let J = [];
            if (a.size) {
              let mn = a.get(N);
              mn && mn.length && J.push(...mn);
              let St = this.driver.query(N, tf, !0);
              for (let tr = 0; tr < St.length; tr++) {
                let ve = a.get(St[tr]);
                ve && ve.length && J.push(...ve);
              }
            }
            const Le = J.filter((mn) => !mn.destroyed);
            Le.length ? hO(this, N, Le) : this.processLeaveNode(N);
          }
          return (
            (m.length = 0),
            rn.forEach((S) => {
              this.players.push(S),
                S.onDone(() => {
                  S.destroy();
                  const N = this.players.indexOf(S);
                  this.players.splice(N, 1);
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
              d = Dt(r, u, []);
            this._getPreviousPlayers(u, c, o, a, n.toState).forEach((h) => {
              const p = h.getRealPlayer();
              p.beforeDestroy && p.beforeDestroy(), h.destroy(), d.push(h);
            });
          }
          Dr(s, n.fromStyles);
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
                return new ks(p.duration, p.delay);
              const _ = g !== l,
                w = (function pO(e) {
                  const t = [];
                  return kD(e, t), t;
                })((r.get(g) || oO).map((ye) => ye.getRealPlayer())).filter(
                  (ye) => !!ye.element && ye.element === g
                ),
                y = s.get(g),
                E = o.get(g),
                j = uD(0, this._normalizer, 0, p.keyframes, y, E),
                Q = this._buildPlayer(p, j, w);
              if ((p.subTimeline && i && d.add(g), _)) {
                const ye = new yf(t, a, g);
                ye.setRealPlayer(Q), u.push(ye);
              }
              return Q;
            });
          u.forEach((p) => {
            Dt(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function cO(e, t, n) {
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
            c.forEach((p) => kt(p, vD));
          const h = Qn(f);
          return (
            h.onDestroy(() => {
              c.forEach((p) => bi(p, vD)), pn(l, n.toStyles);
            }),
            d.forEach((p) => {
              Dt(i, p, []).push(h);
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
            : new ks(t.duration, t.delay);
        }
      }
      class yf {
        constructor(t, n, r) {
          (this.namespaceId = t),
            (this.triggerName = n),
            (this.element = r),
            (this._player = new ks()),
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
              n.forEach((i) => Kd(t, r, void 0, i));
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
          Dt(this._queuedCallbacks, t, []).push(n);
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
      function OD(e, t) {
        const n = e.style.display;
        return (e.style.display = t ?? "none"), n;
      }
      function FD(e, t, n, r, i) {
        const s = [];
        n.forEach((l) => s.push(OD(l)));
        const o = [];
        r.forEach((l, u) => {
          const c = new Map();
          l.forEach((d) => {
            const f = t.computeStyle(u, d, i);
            c.set(d, f), (!f || 0 == f.length) && ((u[Lt] = aO), o.push(u));
          }),
            e.set(u, c);
        });
        let a = 0;
        return n.forEach((l) => OD(l, s[a++])), o;
      }
      function LD(e, t) {
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
      function bi(e, t) {
        e.classList?.remove(t);
      }
      function hO(e, t, n) {
        Qn(n).onDone(() => e.processLeaveNode(t));
      }
      function kD(e, t) {
        for (let n = 0; n < e.length; n++) {
          const r = e[n];
          r instanceof aD ? kD(r.players, t) : t.push(r);
        }
      }
      function VD(e, t, n) {
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
            (this._transitionEngine = new uO(t, n, r)),
            (this._timelineEngine = new tO(t, n, r)),
            (this._transitionEngine.onRemovalComplete = (i, s) =>
              this.onRemovalComplete(i, s));
        }
        registerTrigger(t, n, r, i, s) {
          const o = t + "-" + i;
          let a = this._triggerCache[o];
          if (!a) {
            const l = [],
              c = af(this._driver, s, l, []);
            if (l.length)
              throw (function Xx(e, t) {
                return new D(3404, !1);
              })();
            (a = (function ZP(e, t, n) {
              return new JP(e, t, n);
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
            const [s, o] = cD(r);
            this._timelineEngine.command(s, n, o, i);
          } else this._transitionEngine.trigger(t, n, r, i);
        }
        listen(t, n, r, i, s) {
          if ("@" == r.charAt(0)) {
            const [o, a] = cD(r);
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
      let yO = (() => {
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
                pn(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (pn(this._element, this._initialStyles),
                this._endStyles &&
                  (pn(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (e.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (Dr(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (Dr(this._element, this._endStyles),
                  (this._endStyles = null)),
                pn(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (e.initialStylesByElement = new WeakMap()), e;
      })();
      function vf(e) {
        let t = null;
        return (
          e.forEach((n, r) => {
            (function vO(e) {
              return "display" === e || "position" === e;
            })(r) && ((t = t || new Map()), t.set(r, n));
          }),
          t
        );
      }
      class jD {
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
                t.set(i, this._finished ? r : bD(this.element, i));
            }),
            (this.currentSnapshot = t);
        }
        triggerCallback(t) {
          const n = "start" === t ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      class _O {
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
          return pD(t, n);
        }
        getParentElement(t) {
          return Jd(t);
        }
        query(t, n, r) {
          return gD(t, n, r);
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
            c = o.filter((h) => h instanceof jD);
          (function CP(e, t) {
            return 0 === e || 0 === t;
          })(r, i) &&
            c.forEach((h) => {
              h.currentSnapshot.forEach((p, g) => u.set(g, p));
            });
          let d = (function _P(e) {
            return e.length
              ? e[0] instanceof Map
                ? e
                : e.map((t) => _D(t))
              : [];
          })(n).map((h) => Zn(h));
          d = (function bP(e, t, n) {
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
                  i.forEach((a) => o.set(a, bD(e, a)));
                }
            }
            return t;
          })(t, d, u);
          const f = (function mO(e, t) {
            let n = null,
              r = null;
            return (
              Array.isArray(t) && t.length
                ? ((n = vf(t[0])), t.length > 1 && (r = vf(t[t.length - 1])))
                : t instanceof Map && (n = vf(t)),
              n || r ? new yO(e, n, r) : null
            );
          })(t, d);
          return new jD(t, d, l, f);
        }
      }
      let DO = (() => {
        class e extends nD {
          constructor(n, r) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = n.createRenderer(r.body, {
                id: "0",
                encapsulation: Ut.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(n) {
            const r = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const i = Array.isArray(n) ? iD(n) : n;
            return (
              BD(this._renderer, null, r, "register", [i]),
              new wO(r, this._renderer)
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(us), I(Fe));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class wO extends class Ax {} {
        constructor(t, n) {
          super(), (this._id = t), (this._renderer = n);
        }
        create(t, n) {
          return new EO(this._id, t, n || {}, this._renderer);
        }
      }
      class EO {
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
          return BD(this._renderer, this.element, this.id, t, n);
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
      function BD(e, t, n, r, i) {
        return e.setProperty(t, `@@${n}:${r}`, i);
      }
      const $D = "@.disabled";
      let CO = (() => {
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
                  ((c = new HD("", s, this.engine)),
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
            return r.data.animation.forEach(l), new bO(this, a, s, this.engine);
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
            return new (n || e)(I(us), I(ul), I(Se));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class HD {
        constructor(t, n, r) {
          (this.namespaceId = t),
            (this.delegate = n),
            (this.engine = r),
            (this.destroyNode = this.delegate.destroyNode
              ? (i) => n.destroyNode(i)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
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
          "@" == n.charAt(0) && n == $D
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
      class bO extends HD {
        constructor(t, n, r, i) {
          super(n, r, i), (this.factory = t), (this.namespaceId = n);
        }
        setProperty(t, n, r) {
          "@" == n.charAt(0)
            ? "." == n.charAt(1) && n == $D
              ? this.disableAnimations(t, (r = void 0 === r || !!r))
              : this.engine.process(this.namespaceId, t, n.slice(1), r)
            : this.delegate.setProperty(t, n, r);
        }
        listen(t, n, r) {
          if ("@" == n.charAt(0)) {
            const i = (function SO(e) {
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
                ([s, o] = (function TO(e) {
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
      let IO = (() => {
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
            return new (n || e)(I(Fe), I(Xd), I(ff), I(As));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const UD = [
          { provide: nD, useClass: DO },
          {
            provide: ff,
            useFactory: function MO() {
              return new qP();
            },
          },
          { provide: ul, useClass: IO },
          {
            provide: us,
            useFactory: function AO(e, t, n) {
              return new CO(e, t, n);
            },
            deps: [qa, ul, Se],
          },
        ],
        _f = [
          { provide: Xd, useFactory: () => new _O() },
          { provide: Lv, useValue: "BrowserAnimations" },
          ...UD,
        ],
        zD = [
          { provide: Xd, useClass: mD },
          { provide: Lv, useValue: "NoopAnimations" },
          ...UD,
        ];
      let RO = (() => {
        class e {
          static withConfig(n) {
            return { ngModule: e, providers: n.disableAnimations ? zD : _f };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Ze({ type: e })),
          (e.ɵinj = He({ providers: _f, imports: [Y_] })),
          e
        );
      })();
      function R(...e) {
        let t = e[e.length - 1];
        return oo(t) ? (e.pop(), kl(e, t)) : Vl(e);
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
          if (this.closed) throw new Nr();
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
      class NO extends he {
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
      class xO extends he {
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
      function PO(e, t, n, r, i = new xO(e, n, r)) {
        if (!i.closed) return t instanceof Ee ? t.subscribe(i) : Ll(t)(i);
      }
      const WD = {};
      function GD(...e) {
        let t, n;
        return (
          oo(e[e.length - 1]) && (n = e.pop()),
          "function" == typeof e[e.length - 1] && (t = e.pop()),
          1 === e.length && rh(e[0]) && (e = e[0]),
          Vl(e, n).lift(new OO(t))
        );
      }
      class OO {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, n) {
          return n.subscribe(new FO(t, this.resultSelector));
        }
      }
      class FO extends NO {
        constructor(t, n) {
          super(t),
            (this.resultSelector = n),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(t) {
          this.values.push(WD), this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            n = t.length;
          if (0 === n) this.destination.complete();
          else {
            (this.active = n), (this.toRespond = n);
            for (let r = 0; r < n; r++) this.add(PO(this, t[r], void 0, r));
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(t, n, r) {
          const i = this.values,
            o = this.toRespond
              ? i[r] === WD
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
      function Df(...e) {
        return (function LO() {
          return xr(1);
        })()(R(...e));
      }
      const Si = new Ee((e) => e.complete());
      function wf(e) {
        return e
          ? (function kO(e) {
              return new Ee((t) => e.schedule(() => t.complete()));
            })(e)
          : Si;
      }
      function qD(e) {
        return new Ee((t) => {
          let n;
          try {
            n = e();
          } catch (i) {
            return void t.error(i);
          }
          return (n ? ke(n) : wf()).subscribe(t);
        });
      }
      function $s(e, t) {
        return new Ee(
          t
            ? (n) => t.schedule(VO, 0, { error: e, subscriber: n })
            : (n) => n.error(e)
        );
      }
      function VO({ error: e, subscriber: t }) {
        t.error(e);
      }
      function nn(e, t) {
        return "function" == typeof t
          ? (n) =>
              n.pipe(nn((r, i) => ke(e(r, i)).pipe(X((s, o) => t(r, s, i, o)))))
          : (n) => n.lift(new jO(e));
      }
      class jO {
        constructor(t) {
          this.project = t;
        }
        call(t, n) {
          return n.subscribe(new BO(t, this.project));
        }
      }
      class BO extends uo {
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
          const r = new lo(this),
            i = this.destination;
          i.add(r),
            (this.innerSubscription = co(t, r)),
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
      const KD = (() => {
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
      function Hs(e) {
        return (t) => (0 === e ? wf() : t.lift(new $O(e)));
      }
      class $O {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new KD();
        }
        call(t, n) {
          return n.subscribe(new HO(t, this.total));
        }
      }
      class HO extends he {
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
      function Rn(e, t) {
        return function (r) {
          return r.lift(new zO(e, t));
        };
      }
      class zO {
        constructor(t, n) {
          (this.predicate = t), (this.thisArg = n);
        }
        call(t, n) {
          return n.subscribe(new WO(t, this.predicate, this.thisArg));
        }
      }
      class WO extends he {
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
        return (t) => t.lift(new GO(e));
      }
      class GO {
        constructor(t) {
          this.defaultValue = t;
        }
        call(t, n) {
          return n.subscribe(new qO(t, this.defaultValue));
        }
      }
      class qO extends he {
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
      function QD(e = YO) {
        return (t) => t.lift(new KO(e));
      }
      class KO {
        constructor(t) {
          this.errorFactory = t;
        }
        call(t, n) {
          return n.subscribe(new QO(t, this.errorFactory));
        }
      }
      class QO extends he {
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
      function YO() {
        return new dl();
      }
      function Jn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Rn((i, s) => e(i, s, r)) : so,
            Hs(1),
            n ? fl(t) : QD(() => new dl())
          );
      }
      function Er(e, t) {
        return $e(e, t, 1);
      }
      function Xn() {}
      function Qe(e, t, n) {
        return function (i) {
          return i.lift(new ZO(e, t, n));
        };
      }
      class ZO {
        constructor(t, n, r) {
          (this.nextOrObserver = t), (this.error = n), (this.complete = r);
        }
        call(t, n) {
          return n.subscribe(
            new JO(t, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class JO extends he {
        constructor(t, n, r, i) {
          super(t),
            (this._tapNext = Xn),
            (this._tapError = Xn),
            (this._tapComplete = Xn),
            (this._tapError = r || Xn),
            (this._tapComplete = i || Xn),
            nr(n)
              ? ((this._context = this), (this._tapNext = n))
              : n &&
                ((this._context = n),
                (this._tapNext = n.next || Xn),
                (this._tapError = n.error || Xn),
                (this._tapComplete = n.complete || Xn));
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
      function Cr(e) {
        return function (n) {
          const r = new XO(e),
            i = n.lift(r);
          return (r.caught = i);
        };
      }
      class XO {
        constructor(t) {
          this.selector = t;
        }
        call(t, n) {
          return n.subscribe(new e1(t, this.selector, this.caught));
        }
      }
      class e1 extends uo {
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
            const r = new lo(this);
            this.add(r);
            const i = co(n, r);
            i !== r && this.add(i);
          }
        }
      }
      function YD(e, t) {
        let n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function (i) {
            return i.lift(new t1(e, t, n));
          }
        );
      }
      class t1 {
        constructor(t, n, r = !1) {
          (this.accumulator = t), (this.seed = n), (this.hasSeed = r);
        }
        call(t, n) {
          return n.subscribe(
            new n1(t, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class n1 extends he {
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
          return 0 === e ? wf() : n.lift(new r1(e));
        };
      }
      class r1 {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new KD();
        }
        call(t, n) {
          return n.subscribe(new s1(t, this.total));
        }
      }
      class s1 extends he {
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
      function ZD(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Rn((i, s) => e(i, s, r)) : so,
            Ef(1),
            n ? fl(t) : QD(() => new dl())
          );
      }
      class a1 {
        constructor(t, n) {
          (this.predicate = t), (this.inclusive = n);
        }
        call(t, n) {
          return n.subscribe(new l1(t, this.predicate, this.inclusive));
        }
      }
      class l1 extends he {
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
      class c1 {
        constructor(t) {
          this.value = t;
        }
        call(t, n) {
          return n.subscribe(new d1(t, this.value));
        }
      }
      class d1 extends he {
        constructor(t, n) {
          super(t), (this.value = n);
        }
        _next(t) {
          this.destination.next(this.value);
        }
      }
      function Cf(e) {
        return (t) => t.lift(new f1(e));
      }
      class f1 {
        constructor(t) {
          this.callback = t;
        }
        call(t, n) {
          return n.subscribe(new h1(t, this.callback));
        }
      }
      class h1 extends he {
        constructor(t, n) {
          super(t), this.add(new _e(n));
        }
      }
      const G = "primary",
        Us = Symbol("RouteTitle");
      class p1 {
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
      function Ti(e) {
        return new p1(e);
      }
      function g1(e, t, n) {
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
      function gn(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let i;
        for (let s = 0; s < n.length; s++)
          if (((i = n[s]), !JD(e[i], t[i]))) return !1;
        return !0;
      }
      function JD(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((i, s) => r[s] === i);
        }
        return e === t;
      }
      function XD(e) {
        return Array.prototype.concat.apply([], e);
      }
      function ew(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function je(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function er(e) {
        return Dm(e) ? e : ua(e) ? ke(Promise.resolve(e)) : R(e);
      }
      const v1 = {
          exact: function rw(e, t, n) {
            if (
              !Sr(e.segments, t.segments) ||
              !hl(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !rw(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: iw,
        },
        tw = {
          exact: function _1(e, t) {
            return gn(e, t);
          },
          subset: function D1(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => JD(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function nw(e, t, n) {
        return (
          v1[n.paths](e.root, t.root, n.matrixParams) &&
          tw[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function iw(e, t, n) {
        return sw(e, t, t.segments, n);
      }
      function sw(e, t, n, r) {
        if (e.segments.length > n.length) {
          const i = e.segments.slice(0, n.length);
          return !(!Sr(i, n) || t.hasChildren() || !hl(i, n, r));
        }
        if (e.segments.length === n.length) {
          if (!Sr(e.segments, n) || !hl(e.segments, n, r)) return !1;
          for (const i in t.children)
            if (!e.children[i] || !iw(e.children[i], t.children[i], r))
              return !1;
          return !0;
        }
        {
          const i = n.slice(0, e.segments.length),
            s = n.slice(e.segments.length);
          return (
            !!(Sr(e.segments, i) && hl(e.segments, i, r) && e.children[G]) &&
            sw(e.children[G], t, s, r)
          );
        }
      }
      function hl(e, t, n) {
        return t.every((r, i) => tw[n](e[i].parameters, r.parameters));
      }
      class br {
        constructor(t, n, r) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ti(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return C1.serialize(this);
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
      class zs {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Ti(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return uw(this);
        }
      }
      function Sr(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let ow = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = k({
            token: e,
            factory: function () {
              return new Sf();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class Sf {
        parse(t) {
          const n = new x1(t);
          return new br(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${Ws(t.root, !0)}`,
            r = (function T1(e) {
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
                ? `#${(function b1(e) {
                    return encodeURI(e);
                  })(t.fragment)}`
                : "";
          return `${n}${r}${i}`;
        }
      }
      const C1 = new Sf();
      function pl(e) {
        return e.segments.map((t) => uw(t)).join("/");
      }
      function Ws(e, t) {
        if (!e.hasChildren()) return pl(e);
        if (t) {
          const n = e.children[G] ? Ws(e.children[G], !1) : "",
            r = [];
          return (
            je(e.children, (i, s) => {
              s !== G && r.push(`${s}:${Ws(i, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function E1(e, t) {
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
            i === G ? [Ws(e.children[G], !1)] : [`${i}:${Ws(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[G]
            ? `${pl(e)}/${n[0]}`
            : `${pl(e)}/(${n.join("//")})`;
        }
      }
      function aw(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function gl(e) {
        return aw(e).replace(/%3B/gi, ";");
      }
      function Tf(e) {
        return aw(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function ml(e) {
        return decodeURIComponent(e);
      }
      function lw(e) {
        return ml(e.replace(/\+/g, "%20"));
      }
      function uw(e) {
        return `${Tf(e.path)}${(function S1(e) {
          return Object.keys(e)
            .map((t) => `;${Tf(t)}=${Tf(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const I1 = /^[^\/()?;=#]+/;
      function yl(e) {
        const t = e.match(I1);
        return t ? t[0] : "";
      }
      const M1 = /^[^=?&#]+/,
        R1 = /^[^&#]+/;
      class x1 {
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
          return this.capture(t), new zs(ml(t), this.parseMatrixParams());
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
          const n = (function A1(e) {
            const t = e.match(M1);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = (function N1(e) {
              const t = e.match(R1);
              return t ? t[0] : "";
            })(this.remaining);
            o && ((r = o), this.capture(r));
          }
          const i = lw(n),
            s = lw(r);
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
      function If(e) {
        return e.segments.length > 0 ? new q([], { [G]: e }) : e;
      }
      function vl(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const s = vl(e.children[r]);
          (s.segments.length > 0 || s.hasChildren()) && (t[r] = s);
        }
        return (function P1(e) {
          if (1 === e.numberOfChildren && e.children[G]) {
            const t = e.children[G];
            return new q(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new q(e.segments, t));
      }
      function Tr(e) {
        return e instanceof br;
      }
      function L1(e, t, n, r, i) {
        if (0 === n.length) return Ii(t.root, t.root, t.root, r, i);
        const s = (function fw(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new dw(!0, 0, e);
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
          return new dw(n, t, r);
        })(n);
        return s.toRoot()
          ? Ii(t.root, t.root, new q([], {}), r, i)
          : (function o(l) {
              const u = (function V1(e, t, n, r) {
                  if (e.isAbsolute) return new Mi(t.root, !0, 0);
                  if (-1 === r) return new Mi(n, n === t.root, 0);
                  return (function hw(e, t, n) {
                    let r = e,
                      i = t,
                      s = n;
                    for (; s > i; ) {
                      if (((s -= i), (r = r.parent), !r)) throw new D(4005, !1);
                      i = r.segments.length;
                    }
                    return new Mi(r, !1, i - s);
                  })(n, r + (Gs(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(s, t, e.snapshot?._urlSegment, l),
                c = u.processChildren
                  ? Ks(u.segmentGroup, u.index, s.commands)
                  : Af(u.segmentGroup, u.index, s.commands);
              return Ii(t.root, u.segmentGroup, c, r, i);
            })(e.snapshot?._lastPathIndex);
      }
      function Gs(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function qs(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Ii(e, t, n, r, i) {
        let o,
          s = {};
        r &&
          je(r, (l, u) => {
            s[u] = Array.isArray(l) ? l.map((c) => `${c}`) : `${l}`;
          }),
          (o = e === t ? n : cw(e, t, n));
        const a = If(vl(o));
        return new br(a, s, i);
      }
      function cw(e, t, n) {
        const r = {};
        return (
          je(e.children, (i, s) => {
            r[s] = i === t ? n : cw(i, t, n);
          }),
          new q(e.segments, r)
        );
      }
      class dw {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Gs(r[0]))
          )
            throw new D(4003, !1);
          const i = r.find(qs);
          if (i && i !== ew(r)) throw new D(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Mi {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function Af(e, t, n) {
        if (
          (e || (e = new q([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return Ks(e, t, n);
        const r = (function B1(e, t, n) {
            let r = 0,
              i = t;
            const s = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; i < e.segments.length; ) {
              if (r >= n.length) return s;
              const o = e.segments[i],
                a = n[r];
              if (qs(a)) break;
              const l = `${a}`,
                u = r < n.length - 1 ? n[r + 1] : null;
              if (i > 0 && void 0 === l) break;
              if (l && u && "object" == typeof u && void 0 === u.outlets) {
                if (!gw(l, u, o)) return s;
                r += 2;
              } else {
                if (!gw(l, {}, o)) return s;
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
            Ks(s, 0, i)
          );
        }
        return r.match && 0 === i.length
          ? new q(e.segments, {})
          : r.match && !e.hasChildren()
          ? Rf(e, t, n)
          : r.match
          ? Ks(e, 0, i)
          : Rf(e, t, n);
      }
      function Ks(e, t, n) {
        if (0 === n.length) return new q(e.segments, {});
        {
          const r = (function j1(e) {
              return qs(e[0]) ? e[0].outlets : { [G]: e };
            })(n),
            i = {};
          return (
            je(r, (s, o) => {
              "string" == typeof s && (s = [s]),
                null !== s && (i[o] = Af(e.children[o], t, s));
            }),
            je(e.children, (s, o) => {
              void 0 === r[o] && (i[o] = s);
            }),
            new q(e.segments, i)
          );
        }
      }
      function Rf(e, t, n) {
        const r = e.segments.slice(0, t);
        let i = 0;
        for (; i < n.length; ) {
          const s = n[i];
          if (qs(s)) {
            const l = $1(s.outlets);
            return new q(r, l);
          }
          if (0 === i && Gs(n[0])) {
            r.push(new zs(e.segments[t].path, pw(n[0]))), i++;
            continue;
          }
          const o = qs(s) ? s.outlets[G] : `${s}`,
            a = i < n.length - 1 ? n[i + 1] : null;
          o && a && Gs(a)
            ? (r.push(new zs(o, pw(a))), (i += 2))
            : (r.push(new zs(o, {})), i++);
        }
        return new q(r, {});
      }
      function $1(e) {
        const t = {};
        return (
          je(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = Rf(new q([], {}), 0, n));
          }),
          t
        );
      }
      function pw(e) {
        const t = {};
        return je(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function gw(e, t, n) {
        return e == n.path && gn(t, n.parameters);
      }
      class Nn {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Nf extends Nn {
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
      class Ir extends Nn {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class _l extends Nn {
        constructor(t, n, r, i) {
          super(t, n), (this.reason = r), (this.code = i), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class mw extends Nn {
        constructor(t, n, r, i) {
          super(t, n), (this.error = r), (this.target = i), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class H1 extends Nn {
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
      class U1 extends Nn {
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
      class z1 extends Nn {
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
      class W1 extends Nn {
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
      class G1 extends Nn {
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
      class q1 {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class K1 {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class Q1 {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Y1 {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Z1 {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class J1 {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class yw {
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
      class vw {
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
          const n = xf(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = xf(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = Pf(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((i) => i.value)
                .filter((i) => i !== t);
        }
        pathFromRoot(t) {
          return Pf(t, this._root).map((n) => n.value);
        }
      }
      function xf(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = xf(e, n);
          if (r) return r;
        }
        return null;
      }
      function Pf(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = Pf(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class xn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Ai(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class _w extends vw {
        constructor(t, n) {
          super(t), (this.snapshot = n), Of(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Dw(e, t) {
        const n = (function eF(e, t) {
            const o = new Dl([], {}, {}, "", {}, G, t, null, e.root, -1, {});
            return new Ew("", new xn(o, []));
          })(e, t),
          r = new Vt([new zs("", {})]),
          i = new Vt({}),
          s = new Vt({}),
          o = new Vt({}),
          a = new Vt(""),
          l = new Mr(r, i, o, a, s, G, t, n.root);
        return (l.snapshot = n.root), new _w(new xn(l, []), n);
      }
      class Mr {
        constructor(t, n, r, i, s, o, a, l) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = s),
            (this.outlet = o),
            (this.component = a),
            (this.title = this.data?.pipe(X((u) => u[Us])) ?? R(void 0)),
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
              (this._paramMap = this.params.pipe(X((t) => Ti(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(X((t) => Ti(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function ww(e, t = "emptyOnly") {
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
        return (function tF(e) {
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
            this._paramMap || (this._paramMap = Ti(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ti(this.queryParams)),
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
      class Ew extends vw {
        constructor(t, n) {
          super(n), (this.url = t), Of(this, n);
        }
        toString() {
          return Cw(this._root);
        }
      }
      function Of(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => Of(e, n));
      }
      function Cw(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Cw).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Ff(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            gn(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            gn(t.params, n.params) || e.params.next(n.params),
            (function m1(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!gn(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            gn(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Lf(e, t) {
        const n =
          gn(e.params, t.params) &&
          (function w1(e, t) {
            return (
              Sr(e, t) && e.every((n, r) => gn(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Lf(e.parent, t.parent))
        );
      }
      function Qs(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const i = (function rF(e, t, n) {
            return t.children.map((r) => {
              for (const i of n.children)
                if (e.shouldReuseRoute(r.value, i.value.snapshot))
                  return Qs(e, r, i);
              return Qs(e, r);
            });
          })(e, t, n);
          return new xn(r, i);
        }
        {
          if (e.shouldAttach(t.value)) {
            const s = e.retrieve(t.value);
            if (null !== s) {
              const o = s.route;
              return (
                (o.value._futureSnapshot = t.value),
                (o.children = t.children.map((a) => Qs(e, a))),
                o
              );
            }
          }
          const r = (function iF(e) {
              return new Mr(
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
            i = t.children.map((s) => Qs(e, s));
          return new xn(r, i);
        }
      }
      const kf = "ngNavigationCancelingError";
      function bw(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = Tr(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          i = Sw(!1, 0, t);
        return (i.url = n), (i.navigationBehaviorOptions = r), i;
      }
      function Sw(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[kf] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function Tw(e) {
        return Iw(e) && Tr(e.url);
      }
      function Iw(e) {
        return e && e[kf];
      }
      class sF {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new Ys()),
            (this.attachRef = null);
        }
      }
      let Ys = (() => {
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
            return r || ((r = new sF()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const wl = !1;
      let Mw = (() => {
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
            if (!this.activated) throw new D(4012, wl);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new D(4012, wl);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new D(4012, wl);
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
            if (this.isActivated) throw new D(4013, wl);
            this._activatedRoute = n;
            const i = this.location,
              o = n._futureSnapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new oF(n, a, i.injector);
            if (
              r &&
              (function aF(e) {
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
              T(Ys),
              T(Jt),
              (function qi(e) {
                return (function HC(e, t) {
                  if ("class" === t) return e.classes;
                  if ("style" === t) return e.styles;
                  const n = e.attrs;
                  if (n) {
                    const r = n.length;
                    let i = 0;
                    for (; i < r; ) {
                      const s = n[i];
                      if ($h(s)) break;
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
                })(Re(), e);
              })("name"),
              T(Sa),
              T(Bn)
            );
          }),
          (e.ɵdir = Ve({
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
      class oF {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Mr
            ? this.route
            : t === Ys
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let Vf = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Ue({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [Uy],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && pe(0, "router-outlet");
            },
            dependencies: [Mw],
            encapsulation: 2,
          })),
          e
        );
      })();
      function Aw(e, t) {
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
            (n.component = Vf),
          n
        );
      }
      function jt(e) {
        return e.outlet || G;
      }
      function Rw(e, t) {
        const n = e.filter((r) => jt(r) === t);
        return n.push(...e.filter((r) => jt(r) !== t)), n;
      }
      function Zs(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class fF {
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
            Ff(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const i = Ai(n);
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
            s = Ai(t);
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
            s = Ai(t);
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
          const i = Ai(n);
          t.children.forEach((s) => {
            this.activateRoutes(s, i[s.value.outlet], r),
              this.forwardEvent(new J1(s.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new Y1(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const i = t.value,
            s = n ? n.value : null;
          if ((Ff(i), i === s))
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
                Ff(a.route.value),
                this.activateChildRoutes(t, null, o.children);
            } else {
              const a = Zs(i.snapshot),
                l = a?.get(ls) ?? null;
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
      class Nw {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class El {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function hF(e, t, n) {
        const r = e._root;
        return Js(r, t ? t._root : null, n, [r.value]);
      }
      function Ri(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function zE(e) {
              return null !== go(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function Js(
        e,
        t,
        n,
        r,
        i = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const s = Ai(t);
        return (
          e.children.forEach((o) => {
            (function gF(
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
                const l = (function mF(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !Sr(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Sr(e.url, t.url) || !gn(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Lf(e, t) || !gn(e.queryParams, t.queryParams);
                    default:
                      return !Lf(e, t);
                  }
                })(o, s, s.routeConfig.runGuardsAndResolvers);
                l
                  ? i.canActivateChecks.push(new Nw(r))
                  : ((s.data = o.data), (s._resolvedData = o._resolvedData)),
                  Js(e, t, s.component ? (a ? a.children : null) : n, r, i),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    i.canDeactivateChecks.push(new El(a.outlet.component, o));
              } else
                o && Xs(t, a, i),
                  i.canActivateChecks.push(new Nw(r)),
                  Js(e, null, s.component ? (a ? a.children : null) : n, r, i);
            })(o, s[o.value.outlet], n, r.concat([o.value]), i),
              delete s[o.value.outlet];
          }),
          je(s, (o, a) => Xs(o, n.getContext(a), i)),
          i
        );
      }
      function Xs(e, t, n) {
        const r = Ai(e),
          i = e.value;
        je(r, (s, o) => {
          Xs(s, i.component ? (t ? t.children.getContext(o) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new El(
              i.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              i
            )
          );
      }
      function eo(e) {
        return "function" == typeof e;
      }
      function $f(e) {
        return e instanceof dl || "EmptyError" === e?.name;
      }
      const Cl = Symbol("INITIAL_VALUE");
      function Ni() {
        return nn((e) =>
          GD(
            e.map((t) =>
              t.pipe(
                Hs(1),
                (function UO(...e) {
                  const t = e[e.length - 1];
                  return oo(t)
                    ? (e.pop(), (n) => Df(e, n, t))
                    : (n) => Df(e, n);
                })(Cl)
              )
            )
          ).pipe(
            X((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === Cl) return Cl;
                  if (!1 === n || n instanceof br) return n;
                }
              return !0;
            }),
            Rn((t) => t !== Cl),
            Hs(1)
          )
        );
      }
      function xw(e) {
        return (function fE(...e) {
          return ah(e);
        })(
          Qe((t) => {
            if (Tr(t)) throw bw(0, t);
          }),
          X((t) => !0 === t)
        );
      }
      const Hf = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function Pw(e, t, n, r, i) {
        const s = Uf(e, t, n);
        return s.matched
          ? (function PF(e, t, n, r) {
              const i = t.canMatch;
              return i && 0 !== i.length
                ? R(
                    i.map((o) => {
                      const a = Ri(o, e);
                      return er(
                        (function EF(e) {
                          return e && eo(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(Ni(), xw())
                : R(!0);
            })((r = Aw(t, r)), t, n).pipe(X((o) => (!0 === o ? s : { ...Hf })))
          : R(s);
      }
      function Uf(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Hf }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const i = (t.matcher || g1)(n, e, t);
        if (!i) return { ...Hf };
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
          (function LF(e, t, n) {
            return n.some((r) => Sl(e, t, r) && jt(r) !== G);
          })(e, n, r)
        ) {
          const o = new q(
            t,
            (function FF(e, t, n, r) {
              const i = {};
              (i[G] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const s of n)
                if ("" === s.path && jt(s) !== G) {
                  const o = new q([], {});
                  (o._sourceSegment = e),
                    (o._segmentIndexShift = t.length),
                    (i[jt(s)] = o);
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
          (function kF(e, t, n) {
            return n.some((r) => Sl(e, t, r));
          })(e, n, r)
        ) {
          const o = new q(
            e.segments,
            (function OF(e, t, n, r, i, s) {
              const o = {};
              for (const a of r)
                if (Sl(e, n, a) && !i[jt(a)]) {
                  const l = new q([], {});
                  (l._sourceSegment = e),
                    (l._segmentIndexShift =
                      "legacy" === s ? e.segments.length : t.length),
                    (o[jt(a)] = l);
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
      function Ow(e, t, n, r) {
        return (
          !!(jt(e) === r || (r !== G && Sl(t, n, e))) &&
          ("**" === e.path || Uf(t, e, n).matched)
        );
      }
      function Fw(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const Tl = !1;
      class Il {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Lw {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function to(e) {
        return $s(new Il(e));
      }
      function kw(e) {
        return $s(new Lw(e));
      }
      class $F {
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
              X((s) =>
                this.createUrlTree(
                  vl(s),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Cr((s) => {
                if (s instanceof Lw)
                  return (this.allowRedirects = !1), this.match(s.urlTree);
                throw s instanceof Il ? this.noMatchError(s) : s;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, G)
            .pipe(
              X((i) => this.createUrlTree(vl(i), t.queryParams, t.fragment))
            )
            .pipe(
              Cr((i) => {
                throw i instanceof Il ? this.noMatchError(i) : i;
              })
            );
        }
        noMatchError(t) {
          return new D(4002, Tl);
        }
        createUrlTree(t, n, r) {
          const i = If(t);
          return new br(i, n, r);
        }
        expandSegmentGroup(t, n, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(X((s) => new q([], s)))
            : this.expandSegment(t, r, n, r.segments, i, !0);
        }
        expandChildren(t, n, r) {
          const i = [];
          for (const s of Object.keys(r.children))
            "primary" === s ? i.unshift(s) : i.push(s);
          return ke(i).pipe(
            Er((s) => {
              const o = r.children[s],
                a = Rw(n, s);
              return this.expandSegmentGroup(t, a, o, s).pipe(
                X((l) => ({ segment: l, outlet: s }))
              );
            }),
            YD((s, o) => ((s[o.outlet] = o.segment), s), {}),
            ZD()
          );
        }
        expandSegment(t, n, r, i, s, o) {
          return ke(r).pipe(
            Er((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, i, s, o).pipe(
                Cr((u) => {
                  if (u instanceof Il) return R(null);
                  throw u;
                })
              )
            ),
            Jn((a) => !!a),
            Cr((a, l) => {
              if ($f(a)) return Fw(n, i, s) ? R(new q([], {})) : to(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, i, s, o, a) {
          return Ow(i, n, s, o)
            ? void 0 === i.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, i, s, o)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, i, s, o)
              : to(n)
            : to(n);
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
            ? kw(s)
            : this.lineralizeSegments(r, s).pipe(
                $e((o) => {
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
          if (!a) return to(n);
          const d = this.applyRedirectCommands(l, i.redirectTo, c);
          return i.redirectTo.startsWith("/")
            ? kw(d)
            : this.lineralizeSegments(i, d).pipe(
                $e((f) => this.expandSegment(t, n, r, f.concat(u), o, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, i, s) {
          return "**" === r.path
            ? ((t = Aw(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? R({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    X(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new q(i, {})
                      )
                    )
                  )
                : R(new q(i, {})))
            : Pw(n, r, i, t).pipe(
                nn(
                  ({ matched: o, consumedSegments: a, remainingSegments: l }) =>
                    o
                      ? this.getChildConfig((t = r._injector ?? t), r, i).pipe(
                          $e((c) => {
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
                                X((y) => new q(a, y))
                              );
                            if (0 === f.length && 0 === p.length)
                              return R(new q(a, {}));
                            const m = jt(r) === s;
                            return this.expandSegment(
                              d,
                              g,
                              f,
                              p,
                              m ? G : s,
                              !0
                            ).pipe(
                              X((w) => new q(a.concat(w.segments), w.children))
                            );
                          })
                        )
                      : to(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? R({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? R({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function xF(e, t, n, r) {
                  const i = t.canLoad;
                  return void 0 === i || 0 === i.length
                    ? R(!0)
                    : R(
                        i.map((o) => {
                          const a = Ri(o, e);
                          return er(
                            (function vF(e) {
                              return e && eo(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(Ni(), xw());
                })(t, n, r).pipe(
                  $e((i) =>
                    i
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Qe((s) => {
                            (n._loadedRoutes = s.routes),
                              (n._loadedInjector = s.injector);
                          })
                        )
                      : (function jF(e) {
                          return $s(Sw(Tl, 3));
                        })()
                  )
                )
            : R({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            i = n.root;
          for (;;) {
            if (((r = r.concat(i.segments)), 0 === i.numberOfChildren))
              return R(r);
            if (i.numberOfChildren > 1 || !i.children[G])
              return $s(new D(4e3, Tl));
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
          return new br(
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
      class UF {}
      class GF {
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
            X((n) => {
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
                i = new xn(r, n),
                s = new Ew(this.url, i);
              return this.inheritParamsAndData(s._root), s;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = ww(n, this.paramsInheritanceStrategy);
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
          return ke(Object.keys(r.children)).pipe(
            Er((i) => {
              const s = r.children[i],
                o = Rw(n, i);
              return this.processSegmentGroup(t, o, s, i);
            }),
            YD((i, s) => (i && s ? (i.push(...s), i) : null)),
            (function o1(e, t = !1) {
              return (n) => n.lift(new a1(e, t));
            })((i) => null !== i),
            fl(null),
            ZD(),
            X((i) => {
              if (null === i) return null;
              const s = Vw(i);
              return (
                (function qF(e) {
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
          return ke(n).pipe(
            Er((o) =>
              this.processSegmentAgainstRoute(o._injector ?? t, o, r, i, s)
            ),
            Jn((o) => !!o),
            Cr((o) => {
              if ($f(o)) return Fw(r, i, s) ? R([]) : R(null);
              throw o;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, i, s) {
          if (n.redirectTo || !Ow(n, r, i, s)) return R(null);
          let o;
          if ("**" === n.path) {
            const a = i.length > 0 ? ew(i).parameters : {},
              l = Bw(r) + i.length;
            o = R({
              snapshot: new Dl(
                i,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                Hw(n),
                jt(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                jw(r),
                l,
                Uw(n),
                l
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            o = Pw(r, n, i, t).pipe(
              X(
                ({
                  matched: a,
                  consumedSegments: l,
                  remainingSegments: u,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = Bw(r) + l.length;
                  return {
                    snapshot: new Dl(
                      l,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      Hw(n),
                      jt(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      jw(r),
                      d,
                      Uw(n),
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
              if (null === a) return R(null);
              const {
                snapshot: l,
                consumedSegments: u,
                remainingSegments: c,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function KF(e) {
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
                  X((m) => (null === m ? null : [new xn(l, m)]))
                );
              if (0 === f.length && 0 === p.length) return R([new xn(l, [])]);
              const g = jt(n) === s;
              return this.processSegment(d, f, h, p, g ? G : s).pipe(
                X((m) => (null === m ? null : [new xn(l, m)]))
              );
            })
          );
        }
      }
      function QF(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function Vw(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!QF(r)) {
            t.push(r);
            continue;
          }
          const i = t.find((s) => r.value.routeConfig === s.value.routeConfig);
          void 0 !== i ? (i.children.push(...r.children), n.add(i)) : t.push(r);
        }
        for (const r of n) {
          const i = Vw(r.children);
          t.push(new xn(r.value, i));
        }
        return t.filter((r) => !n.has(r));
      }
      function jw(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function Bw(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function Hw(e) {
        return e.data || {};
      }
      function Uw(e) {
        return e.resolve || {};
      }
      function zw(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function zf(e) {
        return nn((t) => {
          const n = e(t);
          return n ? ke(n).pipe(X(() => t)) : R(t);
        });
      }
      let Ww = (() => {
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
            (e.ɵprov = k({
              token: e,
              factory: function () {
                return be(Gw);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        Gw = (() => {
          class e extends Ww {
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
              return new (n || e)(I(Z_));
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      class rL {}
      class sL extends class iL {
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
      const Al = new V("", { providedIn: "root", factory: () => ({}) }),
        Wf = new V("ROUTES");
      let Gf = (() => {
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
            if (n._loadedComponent) return R(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = er(n.loadComponent()).pipe(
                Qe((s) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = s);
                }),
                Cf(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              i = new jl(r, () => new $t()).pipe(fo());
            return this.componentLoaders.set(n, i), i;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return R({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const s = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                X((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let l,
                    u,
                    c = !1;
                  Array.isArray(a)
                    ? (u = a)
                    : ((l = a.create(n).injector),
                      (u = XD(l.get(Wf, [], P.Self | P.Optional))));
                  return { routes: u.map(Bf), injector: l };
                }),
                Cf(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              o = new jl(s, () => new $t()).pipe(fo());
            return this.childrenLoaders.set(r, o), o;
          }
          loadModuleFactoryOrRoutes(n) {
            return er(n()).pipe(
              $e((r) =>
                r instanceof $y || Array.isArray(r)
                  ? R(r)
                  : ke(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(Nt), I(ad));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class aL {}
      class lL {
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
      function uL(e) {
        throw e;
      }
      function cL(e, t, n) {
        return t.parse("/");
      }
      const dL = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        fL = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      function Kw() {
        const e = be(ow),
          t = be(Ys),
          n = be(Ed),
          r = be(Nt),
          i = be(ad),
          s = be(Wf, { optional: !0 }) ?? [],
          o = be(Al, { optional: !0 }) ?? {},
          a = be(Gw),
          l = be(Ww, { optional: !0 }),
          u = be(aL, { optional: !0 }),
          c = be(rL, { optional: !0 }),
          d = new Be(null, e, t, n, r, i, XD(s));
        return (
          u && (d.urlHandlingStrategy = u),
          c && (d.routeReuseStrategy = c),
          (d.titleStrategy = l ?? a),
          (function hL(e, t) {
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
      let Be = (() => {
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
              (this.errorHandler = uL),
              (this.malformedUriErrorHandler = cL),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.afterPreactivation = () => R(void 0)),
              (this.urlHandlingStrategy = new lL()),
              (this.routeReuseStrategy = new sL()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.configLoader = o.get(Gf)),
              (this.configLoader.onLoadEndListener = (f) =>
                this.triggerEvent(new K1(f))),
              (this.configLoader.onLoadStartListener = (f) =>
                this.triggerEvent(new q1(f))),
              (this.ngModule = o.get(gr)),
              (this.console = o.get(TA));
            const d = o.get(Se);
            (this.isNgZoneEnabled = d instanceof Se && Se.isInAngularZone()),
              this.resetConfig(l),
              (this.currentUrlTree = (function y1() {
                return new br(new q([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = Dw(
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
              Rn((i) => 0 !== i.id),
              X((i) => ({
                ...i,
                extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl),
              })),
              nn((i) => {
                let s = !1,
                  o = !1;
                return R(i).pipe(
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
                        Qw(a.source) && (this.browserUrlTree = a.extractedUrl),
                        R(a).pipe(
                          nn((d) => {
                            const f = this.transitions.getValue();
                            return (
                              r.next(
                                new Nf(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? Si
                                : Promise.resolve(d)
                            );
                          }),
                          (function HF(e, t, n, r) {
                            return nn((i) =>
                              (function BF(e, t, n, r, i) {
                                return new $F(e, t, n, r, i).apply();
                              })(e, t, n, i.extractedUrl, r).pipe(
                                X((s) => ({ ...i, urlAfterRedirects: s }))
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
                          (function ZF(e, t, n, r, i, s) {
                            return $e((o) =>
                              (function WF(
                                e,
                                t,
                                n,
                                r,
                                i,
                                s,
                                o = "emptyOnly",
                                a = "legacy"
                              ) {
                                return new GF(e, t, n, r, i, o, a, s)
                                  .recognize()
                                  .pipe(
                                    nn((l) =>
                                      null === l
                                        ? (function zF(e) {
                                            return new Ee((t) => t.error(e));
                                          })(new UF())
                                        : R(l)
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
                              ).pipe(X((a) => ({ ...o, targetSnapshot: a })))
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
                            const f = new H1(
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
                        _ = new Nf(f, this.serializeUrl(h), p, g);
                      r.next(_);
                      const w = Dw(h, this.rootComponentType).snapshot;
                      return R(
                        (i = {
                          ...a,
                          targetSnapshot: w,
                          urlAfterRedirects: h,
                          extras: {
                            ...m,
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          },
                        })
                      );
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), Si;
                  }),
                  Qe((a) => {
                    const l = new U1(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(l);
                  }),
                  X(
                    (a) =>
                      (i = {
                        ...a,
                        guards: hF(
                          a.targetSnapshot,
                          a.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                  ),
                  (function bF(e, t) {
                    return $e((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: i,
                        guards: {
                          canActivateChecks: s,
                          canDeactivateChecks: o,
                        },
                      } = n;
                      return 0 === o.length && 0 === s.length
                        ? R({ ...n, guardsResult: !0 })
                        : (function SF(e, t, n, r) {
                            return ke(e).pipe(
                              $e((i) =>
                                (function NF(e, t, n, r, i) {
                                  const s =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null;
                                  return s && 0 !== s.length
                                    ? R(
                                        s.map((a) => {
                                          const l = Zs(t) ?? i,
                                            u = Ri(a, l);
                                          return er(
                                            (function wF(e) {
                                              return e && eo(e.canDeactivate);
                                            })(u)
                                              ? u.canDeactivate(e, t, n, r)
                                              : l.runInContext(() =>
                                                  u(e, t, n, r)
                                                )
                                          ).pipe(Jn());
                                        })
                                      ).pipe(Ni())
                                    : R(!0);
                                })(i.component, i.route, n, t, r)
                              ),
                              Jn((i) => !0 !== i, !0)
                            );
                          })(o, r, i, e).pipe(
                            $e((a) =>
                              a &&
                              (function yF(e) {
                                return "boolean" == typeof e;
                              })(a)
                                ? (function TF(e, t, n, r) {
                                    return ke(t).pipe(
                                      Er((i) =>
                                        Df(
                                          (function MF(e, t) {
                                            return (
                                              null !== e && t && t(new Q1(e)),
                                              R(!0)
                                            );
                                          })(i.route.parent, r),
                                          (function IF(e, t) {
                                            return (
                                              null !== e && t && t(new Z1(e)),
                                              R(!0)
                                            );
                                          })(i.route, r),
                                          (function RF(e, t, n) {
                                            const r = t[t.length - 1],
                                              s = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((o) =>
                                                  (function pF(e) {
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
                                                  qD(() =>
                                                    R(
                                                      o.guards.map((l) => {
                                                        const u =
                                                            Zs(o.node) ?? n,
                                                          c = Ri(l, u);
                                                        return er(
                                                          (function DF(e) {
                                                            return (
                                                              e &&
                                                              eo(
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
                                                        ).pipe(Jn());
                                                      })
                                                    ).pipe(Ni())
                                                  )
                                                );
                                            return R(s).pipe(Ni());
                                          })(e, i.path, n),
                                          (function AF(e, t, n) {
                                            const r = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return R(!0);
                                            const i = r.map((s) =>
                                              qD(() => {
                                                const o = Zs(t) ?? n,
                                                  a = Ri(s, o);
                                                return er(
                                                  (function _F(e) {
                                                    return (
                                                      e && eo(e.canActivate)
                                                    );
                                                  })(a)
                                                    ? a.canActivate(t, e)
                                                    : o.runInContext(() =>
                                                        a(t, e)
                                                      )
                                                ).pipe(Jn());
                                              })
                                            );
                                            return R(i).pipe(Ni());
                                          })(e, i.route, n)
                                        )
                                      ),
                                      Jn((i) => !0 !== i, !0)
                                    );
                                  })(r, s, e, t)
                                : R(a)
                            ),
                            X((a) => ({ ...n, guardsResult: a }))
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  Qe((a) => {
                    if (((i.guardsResult = a.guardsResult), Tr(a.guardsResult)))
                      throw bw(0, a.guardsResult);
                    const l = new z1(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(l);
                  }),
                  Rn(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, "", 3),
                      !1)
                  ),
                  zf((a) => {
                    if (a.guards.canActivateChecks.length)
                      return R(a).pipe(
                        Qe((l) => {
                          const u = new W1(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        }),
                        nn((l) => {
                          let u = !1;
                          return R(l).pipe(
                            (function JF(e, t) {
                              return $e((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: i },
                                } = n;
                                if (!i.length) return R(n);
                                let s = 0;
                                return ke(i).pipe(
                                  Er((o) =>
                                    (function XF(e, t, n, r) {
                                      const i = e.routeConfig,
                                        s = e._resolve;
                                      return (
                                        void 0 !== i?.title &&
                                          !zw(i) &&
                                          (s[Us] = i.title),
                                        (function eL(e, t, n, r) {
                                          const i = (function tL(e) {
                                            return [
                                              ...Object.keys(e),
                                              ...Object.getOwnPropertySymbols(
                                                e
                                              ),
                                            ];
                                          })(e);
                                          if (0 === i.length) return R({});
                                          const s = {};
                                          return ke(i).pipe(
                                            $e((o) =>
                                              (function nL(e, t, n, r) {
                                                const i = Zs(t) ?? r,
                                                  s = Ri(e, i);
                                                return er(
                                                  s.resolve
                                                    ? s.resolve(t, n)
                                                    : i.runInContext(() =>
                                                        s(t, n)
                                                      )
                                                );
                                              })(e[o], t, n, r).pipe(
                                                Jn(),
                                                Qe((a) => {
                                                  s[o] = a;
                                                })
                                              )
                                            ),
                                            Ef(1),
                                            (function u1(e) {
                                              return (t) => t.lift(new c1(e));
                                            })(s),
                                            Cr((o) => ($f(o) ? Si : $s(o)))
                                          );
                                        })(s, e, t, r).pipe(
                                          X(
                                            (o) => (
                                              (e._resolvedData = o),
                                              (e.data = ww(e, n).resolve),
                                              i &&
                                                zw(i) &&
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
                                  $e((o) => (s === i.length ? R(n) : Si))
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
                          const u = new G1(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        })
                      );
                  }),
                  zf((a) => {
                    const l = (u) => {
                      const c = [];
                      u.routeConfig?.loadComponent &&
                        !u.routeConfig._loadedComponent &&
                        c.push(
                          this.configLoader.loadComponent(u.routeConfig).pipe(
                            Qe((d) => {
                              u.component = d;
                            }),
                            X(() => {})
                          )
                        );
                      for (const d of u.children) c.push(...l(d));
                      return c;
                    };
                    return GD(l(a.targetSnapshot.root)).pipe(fl(), Hs(1));
                  }),
                  zf(() => this.afterPreactivation()),
                  X((a) => {
                    const l = (function nF(e, t, n) {
                      const r = Qs(e, t._root, n ? n._root : void 0);
                      return new _w(r, t);
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
                    X(
                      (r) => (
                        new fF(
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
                  Cf(() => {
                    s || o || this.cancelNavigationTransition(i, "", 1),
                      this.currentNavigation?.id === i.id &&
                        (this.currentNavigation = null);
                  }),
                  Cr((a) => {
                    if (((o = !0), Iw(a))) {
                      Tw(a) ||
                        ((this.navigated = !0), this.restoreHistory(i, !0));
                      const l = new _l(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a.message,
                        a.cancellationCode
                      );
                      if ((r.next(l), Tw(a))) {
                        const u = this.urlHandlingStrategy.merge(
                            a.url,
                            this.rawUrlTree
                          ),
                          c = {
                            skipLocationChange: i.extras.skipLocationChange,
                            replaceUrl:
                              "eager" === this.urlUpdateStrategy ||
                              Qw(i.source),
                          };
                        this.scheduleNavigation(u, "imperative", null, c, {
                          resolve: i.resolve,
                          reject: i.reject,
                          promise: i.promise,
                        });
                      } else i.resolve(!1);
                    } else {
                      this.restoreHistory(i, !0);
                      const l = new mw(
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
                    return Si;
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
              L1(u, this.currentUrlTree, n, d, c ?? null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const i = Tr(n) ? n : this.parseUrl(n),
              s = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
            return this.scheduleNavigation(s, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function pL(e) {
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
            if (((i = !0 === r ? { ...dL } : !1 === r ? { ...fL } : r), Tr(n)))
              return nw(this.currentUrlTree, n, i);
            const s = this.parseUrl(n);
            return nw(this.currentUrlTree, s, i);
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
                    new Ir(
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
            uc();
          }),
          (e.ɵprov = k({
            token: e,
            factory: function () {
              return Kw();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      function Qw(e) {
        return "imperative" !== e;
      }
      class Yw {}
      let yL = (() => {
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
                Rn((n) => n instanceof Ir),
                Er(() => this.preload())
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
            return ke(i).pipe(xr());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let i;
              i =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : R(null);
              const s = i.pipe(
                $e((o) =>
                  null === o
                    ? R(void 0)
                    : ((r._loadedRoutes = o.routes),
                      (r._loadedInjector = o.injector),
                      this.processRoutes(o.injector ?? n, o.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? ke([s, this.loader.loadComponent(r)]).pipe(xr())
                : s;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(Be), I(ad), I(Bn), I(Yw), I(Gf));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Qf = new V("");
      let Zw = (() => {
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
              n instanceof Nf
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof Ir &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.router.parseUrl(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.router.events.subscribe((n) => {
              n instanceof yw &&
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
              new yw(
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
            uc();
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function xi(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function Yf(e) {
        return [{ provide: Wf, multi: !0, useValue: e }];
      }
      function Xw() {
        const e = be(Nt);
        return (t) => {
          const n = e.get(As);
          if (t !== n.components[0]) return;
          const r = e.get(Be),
            i = e.get(eE);
          1 === e.get(Zf) && r.initialNavigation(),
            e.get(tE, null, P.Optional)?.setUpPreloading(),
            e.get(Qf, null, P.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            i.next(),
            i.complete();
        };
      }
      const eE = new V("", { factory: () => new $t() }),
        Zf = new V("", { providedIn: "root", factory: () => 1 });
      const tE = new V("");
      function wL(e) {
        return xi(0, [
          { provide: tE, useExisting: yL },
          { provide: Yw, useExisting: e },
        ]);
      }
      const nE = new V("ROUTER_FORROOT_GUARD"),
        EL = [
          Ed,
          { provide: ow, useClass: Sf },
          { provide: Be, useFactory: Kw },
          Ys,
          {
            provide: Mr,
            useFactory: function Jw(e) {
              return e.routerState.root;
            },
            deps: [Be],
          },
          Gf,
        ];
      function CL() {
        return new Uv("Router", Be);
      }
      let rE = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                EL,
                [],
                Yf(n),
                {
                  provide: nE,
                  useFactory: IL,
                  deps: [[Be, new es(), new ts()]],
                },
                { provide: Al, useValue: r || {} },
                r?.useHash
                  ? { provide: vr, useClass: pR }
                  : { provide: vr, useClass: p_ },
                {
                  provide: Qf,
                  useFactory: () => {
                    const e = be(Be),
                      t = be(NN),
                      n = be(Al);
                    return (
                      n.scrollOffset && t.setOffset(n.scrollOffset),
                      new Zw(e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? wL(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: Uv, multi: !0, useFactory: CL },
                r?.initialNavigation ? ML(r) : [],
                [
                  { provide: iE, useFactory: Xw },
                  { provide: Fv, multi: !0, useExisting: iE },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: e, providers: [Yf(n)] };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(nE, 8));
          }),
          (e.ɵmod = Ze({ type: e })),
          (e.ɵinj = He({ imports: [Vf] })),
          e
        );
      })();
      function IL(e) {
        return "guarded";
      }
      function ML(e) {
        return [
          "disabled" === e.initialNavigation
            ? xi(3, [
                {
                  provide: wa,
                  multi: !0,
                  useFactory: () => {
                    const t = be(Be);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Zf, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? xi(2, [
                { provide: Zf, useValue: 0 },
                {
                  provide: wa,
                  multi: !0,
                  deps: [Nt],
                  useFactory: (t) => {
                    const n = t.get(fR, Promise.resolve(null));
                    let r = !1;
                    return () =>
                      n.then(
                        () =>
                          new Promise((s) => {
                            const o = t.get(Be),
                              a = t.get(eE);
                            (function i(s) {
                              t.get(Be)
                                .events.pipe(
                                  Rn(
                                    (a) =>
                                      a instanceof Ir ||
                                      a instanceof _l ||
                                      a instanceof mw
                                  ),
                                  X(
                                    (a) =>
                                      a instanceof Ir ||
                                      (a instanceof _l &&
                                        (0 === a.code || 1 === a.code) &&
                                        null)
                                  ),
                                  Rn((a) => null !== a),
                                  Hs(1)
                                )
                                .subscribe(() => {
                                  s();
                                });
                            })(() => {
                              s(!0), (r = !0);
                            }),
                              (o.afterPreactivation = () => (
                                s(!0), r || a.closed ? R(void 0) : a
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
      const iE = new V(""),
        RL = [];
      let NL = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Ze({ type: e })),
          (e.ɵinj = He({ imports: [rE.forRoot(RL), rE] })),
          e
        );
      })();
      class PL {
        constructor(t) {
          this.notifier = t;
        }
        call(t, n) {
          const r = new OL(t),
            i = co(this.notifier, new lo(r));
          return i && !r.seenValue ? (r.add(i), n.subscribe(r)) : r;
        }
      }
      class OL extends uo {
        constructor(t) {
          super(t), (this.seenValue = !1);
        }
        notifyNext() {
          (this.seenValue = !0), this.complete();
        }
        notifyComplete() {}
      }
      const FL = ["overlay"];
      function LL(e, t) {
        1 & e && pe(0, "div");
      }
      function kL(e, t) {
        if ((1 & e && (M(0, "div"), ue(1, LL, 1, 0, "div", 6), A()), 2 & e)) {
          const n = _t(2);
          ca(n.spinner.class),
            yi("color", n.spinner.color),
            se(1),
            Z("ngForOf", n.spinner.divArray);
        }
      }
      function VL(e, t) {
        1 & e &&
          (pe(0, "div", 7),
          (function nv(e, t) {
            const n = Y();
            let r;
            const i = e + 22;
            n.firstCreatePass
              ? ((r = (function $M(e, t) {
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
              o = It(T);
            try {
              const a = No(!1),
                l = s();
              return (
                No(a),
                (function F0(e, t, n, r) {
                  n >= e.data.length &&
                    ((e.data[n] = null), (e.blueprint[n] = null)),
                    (t[n] = r);
                })(n, v(), i, l),
                l
              );
            } finally {
              It(o);
            }
          })(1, "safeHtml")),
          2 & e &&
            Z(
              "innerHTML",
              (function rv(e, t, n) {
                const r = e + 22,
                  i = v(),
                  s = jr(i, r);
                return (function Ts(e, t) {
                  return e[1].data[t].pure;
                })(i, r)
                  ? Zy(i, tt(), t, s.transform, n, s)
                  : s.transform(n);
              })(1, 1, _t(2).template),
              Tp
            );
      }
      function jL(e, t) {
        if (
          (1 & e &&
            (M(0, "div", 1, 2),
            ue(2, kL, 2, 5, "div", 3),
            ue(3, VL, 2, 3, "div", 4),
            M(4, "div", 5),
            hr(5),
            A()()),
          2 & e)
        ) {
          const n = _t();
          yi("background-color", n.spinner.bdColor)(
            "z-index",
            n.spinner.zIndex
          )("position", n.spinner.fullScreen ? "fixed" : "absolute"),
            Z("@.disabled", n.disableAnimation)("@fadeIn", "in"),
            se(2),
            Z("ngIf", !n.template),
            se(1),
            Z("ngIf", n.template),
            se(1),
            yi("z-index", n.spinner.zIndex);
        }
      }
      const BL = ["*"],
        $L = {
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
      class Ar {
        constructor(t) {
          Object.assign(this, t);
        }
        static create(t) {
          return (
            (null == t?.type || 0 === t.type.length) &&
              console.warn(
                '[ngx-spinner]: Property "type" is missed. Please, provide animation type to <ngx-spinner> component\n        and ensure css is added to angular.json file'
              ),
            new Ar(t)
          );
        }
      }
      let sE = (() => {
        class e {
          constructor() {
            this.spinnerObservable = new Vt(null);
          }
          getSpinner(n) {
            return this.spinnerObservable
              .asObservable()
              .pipe(Rn((r) => r && r.name === n));
          }
          show(n = Xf, r) {
            return new Promise((i, s) => {
              setTimeout(() => {
                r && Object.keys(r).length
                  ? ((r.name = n),
                    this.spinnerObservable.next(new Ar({ ...r, show: !0 })),
                    i(!0))
                  : (this.spinnerObservable.next(new Ar({ name: n, show: !0 })),
                    i(!0));
              }, 10);
            });
          }
          hide(n = Xf, r = 10) {
            return new Promise((i, s) => {
              setTimeout(() => {
                this.spinnerObservable.next(new Ar({ name: n, show: !1 })),
                  i(!0);
              }, r);
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const oE = new V("NGX_SPINNER_CONFIG");
      let HL = (() => {
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
              return new (n || e)(T(eD, 16));
            }),
            (e.ɵpipe = Je({ name: "safeHtml", type: e, pure: !0 })),
            e
          );
        })(),
        UL = (() => {
          class e {
            constructor(n, r, i, s) {
              (this.spinnerService = n),
                (this.changeDetector = r),
                (this.elementRef = i),
                (this.globalConfig = s),
                (this.disableAnimation = !1),
                (this.spinner = new Ar()),
                (this.ngUnsubscribe = new $t()),
                (this.setDefaultOptions = () => {
                  const { type: o } = this.globalConfig ?? {};
                  this.spinner = Ar.create({
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
                  (function xL(e) {
                    return (t) => t.lift(new PL(e));
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
              (this.spinner.divCount = $L[n]),
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
              return new (n || e)(T(sE), T(Sa), T(qt), T(oE, 8));
            }),
            (e.ɵcmp = Ue({
              type: e,
              selectors: [["ngx-spinner"]],
              viewQuery: function (n, r) {
                if (
                  (1 & n &&
                    (function uv(e, t, n) {
                      const r = Y();
                      r.firstCreatePass &&
                        (dv(r, new av(e, t, n), -1),
                        2 == (2 & t) && (r.staticViewQueries = !0)),
                        cv(r, v(), t);
                    })(FL, 5),
                  2 & n)
                ) {
                  let i;
                  Un((i = zn())) && (r.spinnerDOM = i.first);
                }
              },
              hostBindings: function (n, r) {
                1 & n &&
                  gi(
                    "keydown",
                    function (s) {
                      return r.handleKeyboardEvent(s);
                    },
                    0,
                    Qp
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
              features: [Ln],
              ngContentSelectors: BL,
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
                1 & n && (vs(), ue(0, jL, 6, 12, "div", 0)),
                  2 & n && Z("ngIf", r.spinner.show);
              },
              dependencies: [Ba, $a, HL],
              styles: [
                ".ngx-spinner-overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%}.ngx-spinner-overlay[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(.loading-text){top:50%;left:50%;margin:0;position:absolute;transform:translate(-50%,-50%)}.loading-text[_ngcontent-%COMP%]{position:absolute;top:60%;left:50%;transform:translate(-50%,-60%)}",
              ],
              data: {
                animation: [
                  Rx("fadeIn", [
                    Nx("in", Ls({ opacity: 1 })),
                    sD(":enter", [Ls({ opacity: 0 }), rD(300)]),
                    sD(":leave", rD(200, Ls({ opacity: 0 }))),
                  ]),
                ],
              },
              changeDetection: 0,
            })),
            e
          );
        })(),
        zL = (() => {
          class e {
            static forRoot(n) {
              return { ngModule: e, providers: [{ provide: oE, useValue: n }] };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ imports: [qn] })),
            e
          );
        })(),
        WL = (() => {
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
            (e.ɵcmp = Ue({
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
                  gi("click", function () {
                    return r.gotoTop();
                  }),
                  pe(3, "i", 3),
                  A()(),
                  M(4, "div", 4)(5, "a", 5),
                  ee(6, "Contact"),
                  A(),
                  M(7, "a", 6),
                  ee(8, "Skills"),
                  A(),
                  M(9, "a", 7),
                  ee(10, "Education"),
                  A(),
                  M(11, "a", 8),
                  ee(12, "Experience"),
                  A()()());
              },
              styles: [
                ".topnav[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;background-color:#333;overflow:hidden;position:sticky;top:0;z-index:100;height:auto}.topnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{float:right;color:#f2f2f2;text-align:center;line-height:50px;padding-left:15px;padding-right:15px;text-decoration:none;font-size:17px;transition:.4s}.topnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:#ddd;color:#000}.topnav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]{background-color:#04aa6d;color:#fff}.home[_ngcontent-%COMP%]{background-color:#04aa6d}.menu[_ngcontent-%COMP%]{margin-left:auto}.scroll-with-offset[_ngcontent-%COMP%]{padding-top:100px;margin-bottom:-100px}",
              ],
            })),
            e
          );
        })(),
        GL = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Ue({
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
                  ee(3, "Created by Bruno Omizu - 2022"),
                  A()()());
              },
              styles: [
                ".footer[_ngcontent-%COMP%]{background-color:#333;overflow:hidden;position:sticky;text-align:center;justify-content:center;vertical-align:middle;color:#fff;font-size:12px;height:50px}.p-footer[_ngcontent-%COMP%]{margin:0;line-height:50px}",
              ],
            })),
            e
          );
        })(),
        qL = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Ue({
              type: e,
              selectors: [["app-main-page"]],
              decls: 61,
              vars: 0,
              consts: [
                [1, "flex-container-main"],
                [1, "image"],
                ["src", "assets/images/bruno.jpg", "alt", ""],
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
                ["href", "https://angular.io/"],
                ["href", "https://www.primefaces.org/primeng/"],
              ],
              template: function (n, r) {
                1 & n &&
                  (M(0, "div", 0)(1, "div", 1),
                  pe(2, "img", 2),
                  A(),
                  M(3, "div", 3)(4, "div", 4)(5, "h1"),
                  ee(6, "Bruno Omizu"),
                  A(),
                  M(7, "p"),
                  ee(8, "Solutions Architect | Technical Lead"),
                  A(),
                  M(9, "p"),
                  ee(10, "New Zealand Permanent Resident"),
                  A()(),
                  M(11, "div", 5)(12, "div")(13, "h4")(14, "strong"),
                  ee(15, "Phone"),
                  A()(),
                  M(16, "p"),
                  ee(17, "000 222 8877"),
                  A()(),
                  M(18, "div")(19, "h4")(20, "strong"),
                  ee(21, "Email"),
                  A()(),
                  M(22, "p"),
                  ee(23, "test@test.com"),
                  A()(),
                  M(24, "div")(25, "h4")(26, "strong"),
                  ee(27, "Date of Birth"),
                  A()(),
                  M(28, "p"),
                  ee(29, "November 12th, 1985"),
                  A()()()()(),
                  M(30, "div", 6)(31, "div", 7)(32, "div", 8)(33, "a", 9),
                  pe(34, "i", 10),
                  A()(),
                  M(35, "div", 8)(36, "a", 11),
                  pe(37, "i", 12),
                  A()(),
                  M(38, "div", 8)(39, "a", 13),
                  pe(40, "i", 14),
                  A()(),
                  M(41, "div", 8)(42, "a", 15),
                  pe(43, "i", 16),
                  A()()()(),
                  M(44, "div", 17)(45, "div", 18)(46, "div", 19)(47, "span"),
                  ee(48, "Hello, I'm Bruno"),
                  A()(),
                  M(49, "p"),
                  ee(
                    50,
                    " I am a Solutions Architect with over 15 years of experience with Software Engineering, Integration, Cloud and DevOps. My passion is to work with technology and understand how it works and what we can do with it. "
                  ),
                  A(),
                  M(51, "p"),
                  ee(
                    52,
                    " As part of my learning journey, I have built this CV webpage using "
                  ),
                  M(53, "a", 20),
                  ee(54, "Angular 14"),
                  A(),
                  ee(55, " and "),
                  M(56, "a", 21),
                  ee(57, "PrimeNg"),
                  A(),
                  ee(
                    58,
                    " components as a experiment to improve my front-end skills. You can find the full code for this website on my GitHub repository (link above). I hope you find the information required to get me a good job in your company :) "
                  ),
                  A(),
                  M(59, "p"),
                  ee(
                    60,
                    " I have a preference for permanent roles and remote (or hybrid / twice a week in the office is fine too). I can also provide references on request. "
                  ),
                  A()()());
              },
              styles: [
                ".flex-container-main[_ngcontent-%COMP%]{display:flex;flex-direction:row;background-color:#eaecee;width:100%;height:auto;position:relative;overflow:hidden}a[_ngcontent-%COMP%]{color:inherit}.image[_ngcontent-%COMP%]{display:block;margin-top:80px;height:350px;width:350px;margin-left:auto;margin-right:0}img[_ngcontent-%COMP%]{height:100%;width:100%;object-fit:contain}.details[_ngcontent-%COMP%]{display:block;margin-top:80px;margin-left:0;margin-right:auto;height:350px;width:348px;background-color:#ebedef;font-size:14px;padding-left:15px;border:1px solid lightgrey}.details-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-bottom:0}.details-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:0;margin-bottom:0}.details-contact[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-top:14px;margin-bottom:0}.details-contact[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:0;margin-bottom:0;font-size:13px}.flex-container-social-main[_ngcontent-%COMP%]{display:flex;flex-direction:row;width:100%;height:auto;position:relative;overflow:hidden}.flex-container-social-box[_ngcontent-%COMP%]{align-items:center;justify-content:center;display:flex;flex-direction:row;flex-wrap:wrap;width:100%;height:auto;background-color:#85929e;margin:1px auto;width:698px;padding:10px;font-size:30px}.flex-container-social-item[_ngcontent-%COMP%]{align-items:center;justify-content:center;margin:5px;padding:5px;height:42px;width:42px}.flex-container-intro[_ngcontent-%COMP%]{display:flex;flex-direction:row;width:100%;height:auto;position:relative;overflow:hidden}.flex-container-intro-box[_ngcontent-%COMP%]{align-items:center;justify-content:center;display:flex;flex-direction:row;flex-wrap:wrap;width:100%;margin:50px auto;width:675px;padding:20px;line-height:1.5em;font-size:15px}.flex-container-intro[_ngcontent-%COMP%]   .intro-hello[_ngcontent-%COMP%]{font-size:20px;margin-top:10px;margin-bottom:5px}.flex-container-intro-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:20px;margin-left:35px;margin-right:35px}",
              ],
            })),
            e
          );
        })();
      const aE = ["*"];
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
            (e.ARROW_CIRCLE_DOWN = "pi pi-arrow-circle-down"),
            (e.ARROW_CIRCLE_LEFT = "pi pi-arrow-circle-left"),
            (e.ARROW_CIRCLE_RIGHT = "pi pi-arrow-circle-right"),
            (e.ARROW_CIRCLE_UP = "pi pi-arrow-circle-up"),
            (e.ARROW_DOWN = "pi pi-arrow-down"),
            (e.ARROW_DOWN_LEFT = "pi pi-arrow-down-left"),
            (e.ARROW_DOWN_RIGHT = "pi pi-arrow-down-right"),
            (e.ARROW_LEFT = "pi pi-arrow-left"),
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
            (e.BOLT = "pi pi-bolt"),
            (e.BOOK = "pi pi-book"),
            (e.BOOKMARK = "pi pi-bookmark"),
            (e.BOOKMARK_FILL = "pi pi-bookmark-fill"),
            (e.BOX = "pi pi-box"),
            (e.BRIEFCASE = "pi pi-briefcase"),
            (e.BUILDING = "pi pi-building"),
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
            (e.DIRECTIONS = "pi pi-directions"),
            (e.DIRECTIONS_ALT = "pi pi-directions-alt"),
            (e.DISCORD = "pi pi-discord"),
            (e.DOLLAR = "pi pi-dollar"),
            (e.DOWNLOAD = "pi pi-download"),
            (e.EJECT = "pi pi-eject"),
            (e.ELLIPSIS_H = "pi pi-ellipsis-h"),
            (e.ELLIPSIS_V = "pi pi-ellipsis-v"),
            (e.ENVELOPE = "pi pi-envelope"),
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
            (e.FILE_EXCEL = "pi pi-file-excel"),
            (e.FILE_PDF = "pi pi-file-pdf"),
            (e.FILTER = "pi pi-filter"),
            (e.FILTER_FILL = "pi pi-filter-fill"),
            (e.FILTER_SLASH = "pi pi-filter-slash"),
            (e.FLAG = "pi pi-flag"),
            (e.FLAG_FILL = "pi pi-flag-fill"),
            (e.FOLDER = "pi pi-folder"),
            (e.FOLDER_OPEN = "pi pi-folder-open"),
            (e.FORWARD = "pi pi-forward"),
            (e.GITHUB = "pi pi-github"),
            (e.GLOBE = "pi pi-globe"),
            (e.GOOGLE = "pi pi-google"),
            (e.HASHTAG = "pi pi-hashtag"),
            (e.HEART = "pi pi-heart"),
            (e.HEART_FILL = "pi pi-heart-fill"),
            (e.HISTORY = "pi pi-history"),
            (e.HOME = "pi pi-home"),
            (e.ID_CARD = "pi pi-id-card"),
            (e.IMAGE = "pi pi-image"),
            (e.IMAGES = "pi pi-images"),
            (e.INBOX = "pi pi-inbox"),
            (e.INFO = "pi pi-info"),
            (e.INFO_CIRCLE = "pi pi-info-circle"),
            (e.INSTAGRAM = "pi pi-instagram"),
            (e.KEY = "pi pi-key"),
            (e.LINK = "pi pi-link"),
            (e.LINKEDIN = "pi pi-linkedin"),
            (e.LIST = "pi pi-list"),
            (e.LOCK = "pi pi-lock"),
            (e.LOCK_OPEN = "pi pi-lock-open"),
            (e.MAP = "pi pi-map"),
            (e.MAP_MARKER = "pi pi-map-marker"),
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
            (e.SUN = "pi pi-sun"),
            (e.SYNC = "pi pi-sync"),
            (e.TABLE = "pi pi-table"),
            (e.TABLET = "pi pi-tablet"),
            (e.TAG = "pi pi-tag"),
            (e.TAGS = "pi pi-tags"),
            (e.TELEGRAM = "pi pi-telegram"),
            (e.TH_LARGE = "pi pi-th-large"),
            (e.THUMBS_DOWN = "pi pi-thumbs-down"),
            (e.THUMBS_UP = "pi pi-thumbs-up"),
            (e.TICKET = "pi pi-ticket"),
            (e.TIMES = "pi pi-times"),
            (e.TIMES_CIRCLE = "pi pi-times-circle"),
            (e.TRASH = "pi pi-trash"),
            (e.TWITTER = "pi pi-twitter"),
            (e.UNDO = "pi pi-undo"),
            (e.UNLOCK = "pi pi-unlock"),
            (e.UPLOAD = "pi pi-upload"),
            (e.USER = "pi pi-user"),
            (e.USER_EDIT = "pi pi-user-edit"),
            (e.USER_MINUS = "pi pi-user-minus"),
            (e.USER_PLUS = "pi pi-user-plus"),
            (e.USERS = "pi pi-users"),
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
            (e.YOUTUBE = "pi pi-youtube"),
            e
          );
        })(),
        KL = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Ue({
              type: e,
              selectors: [["p-header"]],
              ngContentSelectors: aE,
              decls: 1,
              vars: 0,
              template: function (n, r) {
                1 & n && (vs(), hr(0));
              },
              encapsulation: 2,
            })),
            e
          );
        })(),
        QL = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Ue({
              type: e,
              selectors: [["p-footer"]],
              ngContentSelectors: aE,
              decls: 1,
              vars: 0,
              template: function (n, r) {
                1 & n && (vs(), hr(0));
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
              return new (n || e)(T(hn));
            }),
            (e.ɵdir = Ve({
              type: e,
              selectors: [["", "pTemplate", ""]],
              inputs: { type: "type", name: ["pTemplate", "name"] },
            })),
            e
          );
        })(),
        lE = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ imports: [qn] })),
            e
          );
        })();
      function YL(e, t) {
        1 & e && dn(0);
      }
      function ZL(e, t) {
        if (
          (1 & e &&
            (M(0, "div", 8), hr(1, 1), ue(2, YL, 1, 0, "ng-container", 6), A()),
          2 & e)
        ) {
          const n = _t();
          se(2), Z("ngTemplateOutlet", n.headerTemplate);
        }
      }
      function JL(e, t) {
        1 & e && dn(0);
      }
      function XL(e, t) {
        if (
          (1 & e &&
            (M(0, "div", 9), ee(1), ue(2, JL, 1, 0, "ng-container", 6), A()),
          2 & e)
        ) {
          const n = _t();
          se(1),
            Ds(" ", n.header, " "),
            se(1),
            Z("ngTemplateOutlet", n.titleTemplate);
        }
      }
      function ek(e, t) {
        1 & e && dn(0);
      }
      function tk(e, t) {
        if (
          (1 & e &&
            (M(0, "div", 10), ee(1), ue(2, ek, 1, 0, "ng-container", 6), A()),
          2 & e)
        ) {
          const n = _t();
          se(1),
            Ds(" ", n.subheader, " "),
            se(1),
            Z("ngTemplateOutlet", n.subtitleTemplate);
        }
      }
      function nk(e, t) {
        1 & e && dn(0);
      }
      function rk(e, t) {
        1 & e && dn(0);
      }
      function ik(e, t) {
        if (
          (1 & e &&
            (M(0, "div", 11),
            hr(1, 2),
            ue(2, rk, 1, 0, "ng-container", 6),
            A()),
          2 & e)
        ) {
          const n = _t();
          se(2), Z("ngTemplateOutlet", n.footerTemplate);
        }
      }
      const sk = ["*", [["p-header"]], [["p-footer"]]],
        ok = ["*", "p-header", "p-footer"];
      let eh = (() => {
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
            (e.ɵcmp = Ue({
              type: e,
              selectors: [["p-card"]],
              contentQueries: function (n, r, i) {
                if (
                  (1 & n && (mr(i, KL, 5), mr(i, QL, 5), mr(i, Ol, 4)), 2 & n)
                ) {
                  let s;
                  Un((s = zn())) && (r.headerFacet = s.first),
                    Un((s = zn())) && (r.footerFacet = s.first),
                    Un((s = zn())) && (r.templates = s);
                }
              },
              hostAttrs: [1, "p-element"],
              inputs: {
                header: "header",
                subheader: "subheader",
                style: "style",
                styleClass: "styleClass",
              },
              ngContentSelectors: ok,
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
                  (vs(sk),
                  M(0, "div", 0),
                  ue(1, ZL, 3, 1, "div", 1),
                  M(2, "div", 2),
                  ue(3, XL, 3, 2, "div", 3),
                  ue(4, tk, 3, 2, "div", 4),
                  M(5, "div", 5),
                  hr(6),
                  ue(7, nk, 1, 0, "ng-container", 6),
                  A(),
                  ue(8, ik, 3, 1, "div", 7),
                  A()()),
                  2 & n &&
                    (ca(r.styleClass),
                    Z("ngClass", "p-card p-component")("ngStyle", r.style),
                    se(1),
                    Z("ngIf", r.headerFacet || r.headerTemplate),
                    se(2),
                    Z("ngIf", r.header || r.titleTemplate),
                    se(1),
                    Z("ngIf", r.subheader || r.subtitleTemplate),
                    se(3),
                    Z("ngTemplateOutlet", r.contentTemplate),
                    se(1),
                    Z("ngIf", r.footerFacet || r.footerTemplate));
              },
              dependencies: [ja, $a, Fd, Od],
              styles: [".p-card-header img{width:100%}\n"],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })(),
        ak = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ imports: [qn, lE] })),
            e
          );
        })();
      function lk(e, t) {
        1 & e && dn(0);
      }
      function uk(e, t) {
        1 & e && dn(0);
      }
      const th = function (e) {
        return { $implicit: e };
      };
      function ck(e, t) {
        if (
          (1 & e && (aa(0), ue(1, uk, 1, 0, "ng-container", 4), la()), 2 & e)
        ) {
          const n = _t().$implicit,
            r = _t();
          se(1),
            Z("ngTemplateOutlet", r.markerTemplate)(
              "ngTemplateOutletContext",
              ya(2, th, n)
            );
        }
      }
      function dk(e, t) {
        1 & e && pe(0, "div", 10);
      }
      function fk(e, t) {
        1 & e && pe(0, "div", 11);
      }
      function hk(e, t) {
        1 & e && dn(0);
      }
      function pk(e, t) {
        if (
          (1 & e &&
            (M(0, "div", 2)(1, "div", 3),
            ue(2, lk, 1, 0, "ng-container", 4),
            A(),
            M(3, "div", 5),
            ue(4, ck, 2, 4, "ng-container", 6),
            ue(5, dk, 1, 0, "ng-template", null, 7, hv),
            ue(7, fk, 1, 0, "div", 8),
            A(),
            M(8, "div", 9),
            ue(9, hk, 1, 0, "ng-container", 4),
            A()()),
          2 & e)
        ) {
          const n = t.$implicit,
            r = t.last,
            i = (function vm(e) {
              return jr(
                (function wC() {
                  return B.lFrame.contextLView;
                })(),
                22 + e
              );
            })(6),
            s = _t();
          se(2),
            Z("ngTemplateOutlet", s.oppositeTemplate)(
              "ngTemplateOutletContext",
              ya(7, th, n)
            ),
            se(2),
            Z("ngIf", s.markerTemplate)("ngIfElse", i),
            se(3),
            Z("ngIf", !r),
            se(2),
            Z("ngTemplateOutlet", s.contentTemplate)(
              "ngTemplateOutletContext",
              ya(9, th, n)
            );
        }
      }
      const gk = function (e, t, n, r, i, s, o) {
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
      let mk = (() => {
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
            (e.ɵcmp = Ue({
              type: e,
              selectors: [["p-timeline"]],
              contentQueries: function (n, r, i) {
                if ((1 & n && mr(i, Ol, 4), 2 & n)) {
                  let s;
                  Un((s = zn())) && (r.templates = s);
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
                1 & n && (M(0, "div", 0), ue(1, pk, 10, 11, "div", 1), A()),
                  2 & n &&
                    (ca(r.styleClass),
                    Z("ngStyle", r.style)(
                      "ngClass",
                      Yy(
                        5,
                        gk,
                        "left" === r.align,
                        "right" === r.align,
                        "top" === r.align,
                        "bottom" === r.align,
                        "alternate" === r.align,
                        "vertical" === r.layout,
                        "horizontal" === r.layout
                      )
                    ),
                    se(1),
                    Z("ngForOf", r.value));
              },
              dependencies: [ja, Ba, $a, Fd, Od],
              styles: [
                ".p-timeline{display:flex;flex-grow:1;flex-direction:column}.p-timeline-left .p-timeline-event-opposite{text-align:right}.p-timeline-left .p-timeline-event-content{text-align:left}.p-timeline-right .p-timeline-event{flex-direction:row-reverse}.p-timeline-right .p-timeline-event-opposite{text-align:left}.p-timeline-right .p-timeline-event-content{text-align:right}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even){flex-direction:row-reverse}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite{text-align:right}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content{text-align:left}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-opposite{text-align:left}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content{text-align:right}.p-timeline-event{display:flex;position:relative;min-height:70px}.p-timeline-event:last-child{min-height:0}.p-timeline-event-opposite,.p-timeline-event-content{flex:1;padding:0 1rem}.p-timeline-event-separator{flex:0;display:flex;align-items:center;flex-direction:column}.p-timeline-event-marker{display:flex;align-self:baseline}.p-timeline-event-connector{flex-grow:1}.p-timeline-horizontal{flex-direction:row}.p-timeline-horizontal .p-timeline-event{flex-direction:column;flex:1}.p-timeline-horizontal .p-timeline-event:last-child{flex:0}.p-timeline-horizontal .p-timeline-event-separator{flex-direction:row}.p-timeline-horizontal .p-timeline-event-connector{width:100%}.p-timeline-bottom .p-timeline-event{flex-direction:column-reverse}.p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(even){flex-direction:column-reverse}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })(),
        yk = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ imports: [qn, lE] })),
            e
          );
        })();
      function vk(e, t) {
        if ((1 & e && (M(0, "span"), pe(1, "i", 6), A()), 2 & e)) {
          const n = t.$implicit;
          se(1), yi("color", n.color), Z("ngClass", n.icon);
        }
      }
      function _k(e, t) {
        if ((1 & e && (M(0, "a", 10), pe(1, "img", 11), A()), 2 & e)) {
          const n = _t().$implicit;
          Z("href", n.url, os), se(1), Z("alt", n.company)("src", n.image, os);
        }
      }
      function Dk(e, t) {
        if (
          (1 & e &&
            (M(0, "p-card", 7),
            ue(1, _k, 2, 3, "ng-template", 8),
            M(2, "p", 9),
            ee(3),
            A()()),
          2 & e)
        ) {
          const n = t.$implicit;
          Z("header", n.company)("subheader", n.date), se(3), Vc(n.description);
        }
      }
      let wk = (() => {
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
                  "I am currently working as a Technical Lead in the Digital and Integration space. I work closely with our Enterprise Solution Architects and Software Developers to ensure our enterprise solutions are fit-for-purpose in regards to design, integration, security and scalability to enable us to deliver high-quality Web and Mobile products for our customers",
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
                  "I have worked as a Cloud and DevOps Manager for Vivo to help establish Vivo's DevOps framework to support CI/CD pipelines for ICT teams. I have also helped Vivo define its enterprise cloud strategy for the next few years as part of the Telefonica-Microsoft agreement to help them shift on-premise resources over to Microsoft Azure",
              },
              {
                company: "Accenture New Zealand",
                date: "July 2016 - March 2020",
                url: "https://www.accenture.com/nz-en/about/company/new-zealand",
                icon: Pl.CIRCLE,
                image: "assets/images/accenture.svg",
                color: "#85929e",
                description:
                  "During my 3 years tenure with Acceture New Zealand, I was involved in inumerous projects to support Accenture' clients predominantly in the Health and Public sectors across New Zealand. The projects would involve different roles with many different focus such as Solution Architecture, Integration, Testing and DevOps",
              },
              {
                company: "Accenture Brazil",
                date: "March 2007 - July 2016",
                url: "https://www.accenture.com/br-pt",
                icon: Pl.CIRCLE,
                image: "assets/images/accenture.svg",
                color: "#85929e",
                description:
                  "I have started my career as a Test Analyst back in 2007 moving to Software Development and Integration a few years later. After 9 years of experience working for multiple clients and projects across different locations within the LATAM region, I was offered a relocation to New Zealand to participate in a major business transformation project for a government agency in Wellington",
              },
            ];
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Ue({
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
                pe(1, "i", 1),
                M(2, "h3"),
                ee(3, "EXPERIENCE"),
                A()(),
                M(4, "div", 2)(5, "p-timeline", 3),
                ue(6, vk, 2, 3, "ng-template", 4),
                ue(7, Dk, 4, 3, "ng-template", 5),
                A()()),
                2 & n && (se(5), Z("value", r.events));
            },
            dependencies: [ja, eh, Ol, mk],
            styles: [
              ".flex-container-experience-box[_ngcontent-%COMP%]{width:100%;padding:30px 150px;background-color:#ebedef}",
            ],
          })),
          e
        );
      })();
      function Ek(e, t) {
        1 & e && (M(0, "a", 6), pe(1, "img", 7), A());
      }
      const Ck = function () {
        return { width: "48%", "margin-left": "auto", "margin-right": "auto" };
      };
      let bk = (() => {
        class e {
          constructor() {}
          ngOnInit() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Ue({
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
                pe(1, "i", 1),
                M(2, "h3"),
                ee(3, "EDUCATION"),
                A()(),
                pe(4, "div", 2),
                M(5, "div", 3)(6, "p-card", 4),
                ue(7, Ek, 2, 0, "ng-template", 5),
                M(8, "p"),
                ee(
                  9,
                  " Relevant Modules: Algorithmics, Systems Programming, Professional Software Development, Advanced Networks and Operating Systems "
                ),
                A()()()),
                2 & n && (se(6), Pt(qc(2, Ck)));
            },
            dependencies: [eh, Ol],
            styles: [
              ".flex-container-education-box[_ngcontent-%COMP%]{padding-top:30px;padding-bottom:30px;margin-left:auto;margin-right:auto;display:flex;flex-direction:row;align-items:center;justify-content:center;background-color:#ebedef}",
            ],
          })),
          e
        );
      })();
      function Sk(e, t) {
        1 & e && pe(0, "i", 6);
      }
      const Tk = function () {
        return { "text-align": "center" };
      };
      function Ik(e, t) {
        if (
          (1 & e && (M(0, "p-card", 4), ue(1, Sk, 1, 0, "i", 5), A()), 2 & e)
        ) {
          const n = t.$implicit,
            r = _t();
          Pt(qc(5, Tk)),
            Z("header", n.name)("subheader", n.description),
            se(1),
            Z("ngForOf", r.starsArray(n.stars));
        }
      }
      let Mk = (() => {
          class e {
            constructor() {
              (this.skills = []), (this.stars = []);
            }
            ngOnInit() {
              this.skills = [
                {
                  name: "Back-End",
                  description:
                    "AWS Lambda, Azure Functions, Node.js, Python, Typescript",
                  stars: 3,
                },
                { name: "Cloud", description: "AWS, Azure", stars: 4 },
                {
                  name: "DevOps",
                  description:
                    "Azure DevOps, Bitbucket, Bamboo, CircleCI, GitLab, GitHub",
                  stars: 5,
                },
                {
                  name: "Front-End",
                  description: "Angular, CSS, Cypress, HTML, TypeScript",
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
            (e.ɵcmp = Ue({
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
                  pe(1, "i", 1),
                  M(2, "h3"),
                  ee(3, "SKILLS"),
                  A()(),
                  M(4, "div", 2),
                  ue(5, Ik, 2, 6, "p-card", 3),
                  A()),
                  2 & n && (se(5), Z("ngForOf", r.skills));
              },
              dependencies: [Ba, eh],
              styles: [
                ".flex-container-skills-box[_ngcontent-%COMP%]{padding-top:20px;padding-bottom:20px;width:100%;display:flex;flex-direction:row;flex-wrap:wrap;background-color:#ebedef;align-items:center;justify-content:center}p-card[_ngcontent-%COMP%]{width:250px;margin:15px}",
              ],
            })),
            e
          );
        })(),
        Ak = (() => {
          class e {
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Ue({
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
                  pe(1, "i", 1),
                  M(2, "h3"),
                  ee(3, "CONTACT"),
                  A()());
              },
              styles: [
                ".flex-container-contact-box[_ngcontent-%COMP%]{display:flex;width:50%;font-size:24px}",
              ],
            })),
            e
          );
        })(),
        Rk = (() => {
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
              return new (n || e)(T(sE));
            }),
            (e.ɵcmp = Ue({
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
                  ee(2, "Loading..."),
                  A()(),
                  pe(3, "app-header")(4, "app-main-page"),
                  M(5, "section", 2),
                  pe(6, "app-experience")(7, "app-education"),
                  A(),
                  pe(8, "app-skills")(9, "app-contact")(10, "app-footer")),
                  2 & n && Z("fullScreen", !0);
              },
              dependencies: [UL, WL, GL, qL, wk, bk, Mk, Ak],
            })),
            e
          );
        })(),
        Nk = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ imports: [qn] })),
            e
          );
        })(),
        Pk = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ imports: [qn, Nk] })),
            e
          );
        })(),
        Ok = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e })),
            (e.ɵinj = He({ imports: [qn] })),
            e
          );
        })(),
        Fk = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ze({ type: e, bootstrap: [Rk] })),
            (e.ɵinj = He({
              imports: [
                Y_,
                RO,
                NL,
                ak,
                Pk,
                yk,
                zL.forRoot({ type: "square-jelly-box" }),
                Ok,
              ],
            })),
            e
          );
        })();
      (function WA() {
        Xv = !1;
      })(),
        _x()
          .bootstrapModule(Fk)
          .catch((e) => console.error(e));
    },
  },
  (nr) => {
    nr((nr.s = 29));
  },
]);
