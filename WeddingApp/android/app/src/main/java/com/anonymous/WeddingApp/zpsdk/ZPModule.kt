package com.demopay.zpsdk

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import vn.zalopay.sdk.ZaloPaySDK
import vn.zalopay.sdk.listeners.PayOrderListener
import vn.zalopay.sdk.ZaloPayError

class ZPModule(reactContext : ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var mReactContext = reactContext
    private val PAYMENTSUCCESS = "1"
    private val PAYMENTFAILED = "-1"
    private val PAYMENTCANCLED = "4"

    private val listener = object : PayOrderListener {
        override fun onPaymentSucceeded(transactionId: String, transToken: String, appTransID: String) {
            val params = Arguments.createMap().apply {
                putString("transactionId", transactionId)
                putString("transToken", transToken)
                putString("appTransID", appTransID)
                putString("returnCode", PAYMENTSUCCESS)
            }
            sendEvent(mReactContext, "EventPayZalo", params)
        }

        override fun onPaymentCanceled(transToken: String, appTransID: String) {
            val params = Arguments.createMap().apply {
                putString("returnCode", PAYMENTCANCLED)
                putString("zpTransToken", transToken)
                putString("appTransID", appTransID)
            }
            sendEvent(mReactContext, "EventPayZalo", params)
        }

        override fun onPaymentError(zaloPayError: ZaloPayError, transToken: String, appTransID: String) {
            val params = Arguments.createMap().apply {
                putString("returnCode", PAYMENTFAILED)
                putString("zpTransToken", transToken)
                putString("appTransID", appTransID)
            }
            sendEvent(mReactContext, "EventPayZalo", params)
        }
    }

    private val activityEventListener = object : BaseActivityEventListener() {
        override fun onNewIntent(intent: Intent) {
            super.onNewIntent(intent)
        }
    }

    init {
        reactContext.addActivityEventListener(activityEventListener)
    }

    override fun getName(): String = "PayZaloBridge"

    @ReactMethod
    fun payOrder(zpTransToken: String) {
        val currentActivity1 = currentActivity
        if (currentActivity1 != null) {
            ZaloPaySDK.getInstance().payOrder(currentActivity1, zpTransToken, "demozpdk://app", listener)
        }
    }

    @ReactMethod
    fun installApp() {
        ZaloPaySDK.getInstance().navigateToZaloOnStore(mReactContext)
    }

    private fun sendEvent(reactContext: ReactApplicationContext, eventName: String, params: WritableMap) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
    }
}