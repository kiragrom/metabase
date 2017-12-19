(ns metabase.util.metrics
  (:require [clojure.string :as str]
            [metrics.timers :refer [time-fn! timer]]
            [metrics.reporters.jmx :as jmx]))

(defn database->metric-str
  "This function should be private, but since it's used in the `time-db!` macro, needs to be public"
  [{:keys [id name] :as database}]
  (str name "-" id))

(defmacro with-time-db!
  "Time `body` using both the global timer (across all dbs) and a db specific timer"
  [database timer-path & body]
  `(let [timer-path#   ~timer-path
         global-timer# (timer (concat ["default" "global"] timer-path#))
         db-timer#     (timer (concat ["default" (database->metric-str ~database)] timer-path#))]
     ;; This should probably just be invocations of `time!` but for some reason that throws off our docstring
     ;; linter. `time!` creates a proxy object that the linter thinks needs to have a docstring. Switching to the
     ;; function based invocations avoids the issue
     (time-fn! global-timer#
               (fn []
                 (time-fn! db-timer#
                           (fn []
                             ~@body))))))
