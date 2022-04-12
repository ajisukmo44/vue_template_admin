<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row mb-4">
      <div class="col-xl-4 h-100">
        <div class="card h-100">
          <div class="card-body">
            <div  class="float-right ml-2">
              <h4 class="card-title">{{ $t('dashboard.top-agent') }}</h4>
            </div>
            <div>
              <div class="mb-3 mr-3">
                  <img
                    src="@/assets/images/users/avatar-14.jpg"
                    class="mr-3 rounded-circle avatar-md"
                    alt="user-pic"
                  />
              </div>

              <div>
                <h5><b>Yusuf Miftah Farid</b></h5>
                <p class="text-muted mb-0">#SK0234</p>
                <p class="text-muted mb-0">yusuf.miftah@gmail.com</p>
              </div>
            </div>
          </div>

          <div class="card-body border-top">
            <div class="row">
              <div class="col-sm-6">
                <div>
                  <p class="font-weight-medium mb-1">{{ $t('dashboard.total-case') }}</p>
                  <h2>46</h2>
                </div>
              </div>
              <div class="col-sm-6">
                <div>
                  <p class="font-weight-medium mb-1">{{ $t('dashboard.total-case') }}</p>
                  <h2>46</h2>
                </div>
              </div>
            </div>
          </div>

          <div class="card-footer bg-transparent border-top">
            <div class="text-center">
              <a href="javascript: void(0);" class="btn btn-outline-light btn-block text-secondary mr-2 w-md">{{ $t('dashboard.detail-profile') }}</a>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-8 h-100">
        <div class="card">
          <div>
            <div class="row">
              <div class="col-lg-9 col-sm-8">
                <div class="p-4">
                  <h5 class="text-b">Welcome Back !</h5>
                  <p>Secure Me Dashboard</p>

                  <div class="text-muted">
                    <p class="mb-1">
                      <i class="mdi mdi-circle-medium align-middle text-primary mr-1"></i>
                      Security System
                    </p>
                    <p class="mb-1">
                      <i class="mdi mdi-circle-medium align-middle text-primary mr-1"></i>
                      Security Management
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-circle-medium align-middle text-primary mr-1"></i>
                      Security Academy
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-4 align-self-center">
                <div>
                  <img
                    src="@/assets/images/crypto/features-img/img-1.png"
                    alt
                    class="img-fluid d-block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <p class="text-muted mb-4">
                  <i class="mdi mdi-account-box-outline h2 text-warning align-middle mb-0 mr-3"></i> {{ $t('dashboard.total-agent') }}
                </p>
                <div class="row pb-3">
                  <div class="col-6">
                    <div>
                      <h2>245</h2>
                      <p class="text-muted text-truncate mb-0">
                      </p>
                    </div>
                  </div>
                  <div class="col-6">
                    <div>
                      <apexchart
                        class="apex-charts"
                        height="40"
                        type="area"
                        dir="ltr"
                        :series="bitconinChart.series"
                        :options="bitconinChart.chartOptions"
                      ></apexchart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <p class="text-muted mb-4">
                  <i class="mdi mdi-note-text-outline h2 text-info align-middle mb-0 mr-3"></i> {{ $t('dashboard.total-case') }}
                </p>

                <div class="row pb-3">
                  <div class="col-6">
                    <div>
                      <h2>666</h2>
                      <p class="text-muted text-truncate mb-0">
                      </p>
                    </div>
                  </div>
                  <div class="col-6">
                    <div>
                      <apexchart
                        class="apex-charts"
                        height="40"
                        type="area"
                        dir="ltr"
                        :series="ethereumChart.series"
                        :options="ethereumChart.chartOptions"
                      ></apexchart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <p class="text-muted mb-4">
                  <i class="mdi mdi-align-vertical-bottom h2 text-success align-middle mb-0 mr-3"></i> {{ $t('dashboard.case-this-month') }}
                </p>
                <div class="row pb-3">
                  <div class="col-6">
                    <div>
                      <h2>71</h2>
                      <p class="text-muted text-truncate mb-0">
                      </p>
                    </div>
                  </div>
                  <div class="col-6">
                    <div>
                      <apexchart
                        class="apex-charts"
                        height="40"
                        type="area"
                        dir="ltr"
                        :series="litecoinChart.series"
                        :options="litecoinChart.chartOptions"
                      ></apexchart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
    <div class="row mb-4">
      <div class="col-xl-8">
        <div class="card h-100">
          <div class="card-body">
            <div class="float-right">
              <select class="custom-select custom-select-sm ml-2">
                <option value="1" selected>March</option>
                <option value="2">February</option>
                <option value="3">January</option>
                <option value="4">December</option>
              </select>
            </div>
            <h4 class="card-title mb-3">{{ $t('dashboard.case-report') }}</h4>

            <div class="row">
              <div class="col-lg-4">
                <div class="mt-4">
                  <p>{{ $t('dashboard.total-case') }}</p>
                  <h4>4.567</h4>

                  <p class="text-muted mb-4">
                    + 234
                    <i class="mdi mdi-arrow-up ml-1 text-success"></i> {{ $t('dashboard.this-month') }}
                  </p>

                  <div class="row">
                    <div class="col-6">
                      <div>
                        <p class="mb-2">{{ $t('dashboard.today') }}</p>
                        <h4>44</h4>
                      </div>
                    </div>
                    <div class="col-6">
                      <div>
                        <p class="mb-2">{{ $t('dashboard.this-week') }}</p>
                        <h4>2.645</h4>
                      </div>
                    </div>
                  </div>

                  <div class="mt-4">
                    <a href="#" class="btn btn-primary btn-sm">
                      View more
                      <i class="mdi mdi-arrow-right ml-1"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-sm-6">
                <div>
                  <apexchart
                    class="apex-charts"
                    dir="ltr"
                    type="radialBar"
                    height="300"
                    :series="walletRadialChart.series"
                    :options="walletRadialChart.chartOptions"
                  ></apexchart>
                </div>
              </div>

              <div class="col-lg-4 col-sm-6 align-self-center">
                <div>
                  <p class="mb-2">
                    <i class="mdi mdi-circle align-middle font-size-10 mr-2 text-primary"></i> Case 1
                  </p>
                </div>

                <div class="mt-4 pt-2">
                  <p class="mb-2">
                    <i class="mdi mdi-circle align-middle font-size-10 mr-2 text-warning"></i> Case 2
                  </p>
                </div>

                <div class="mt-4 pt-2">
                  <p class="mb-2">
                    <i class="mdi mdi-circle align-middle font-size-10 mr-2 text-info"></i> Case 3
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4">
        <div class="card h-100">
          <div class="card-body">
            <h4 class="card-title mb-3">{{ $t('dashboard.overview') }}</h4>

            <div>
              <div id="overview-chart" class="apex-charts" dir="ltr">
                <div class="toolbar button-items text-center">
                  <!-- <button type="button" class="btn btn-light btn-sm" id="one_month">1M</button>
                  <button type="button" class="btn btn-light btn-sm" id="six_months">6M</button>
                  <button type="button" class="btn btn-light btn-sm active" id="one_year">1Y</button>
                  <button type="button" class="btn btn-light btn-sm" id="all">ALL</button> -->
                </div>
                <apexchart
                  class="apex-charts"
                  type="area"
                  height="275"
                  dir="ltr"
                  :series="overviewChart.series"
                  :options="overviewChart.chartOptions"
                ></apexchart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </Layout>
</template>

<script>
import Layout from "../../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";

import simplebar from "simplebar-vue";

import {
  walletRadialChart,
  overviewChart,
  transactionsData,
  bitconinChart,
  ethereumChart,
  litecoinChart
} from "./data";

/**
 * Crypto Dashboard Component
 */
export default {
  page: {
    title: "Secure ME Dashboard",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader, simplebar },
  data() {
    return {
      walletRadialChart: walletRadialChart,
      overviewChart: overviewChart,
      transactionsData: transactionsData,
      bitconinChart: bitconinChart,
      ethereumChart: ethereumChart,
      litecoinChart: litecoinChart,
      title: "Secure ME",
      items: [
        {
          text: "Dashboards",
          href: "/"
        },
      ]
    };
  }
};
</script>

<style scope>
.text-muted{
  font-size:15px;
  font-weight: 500;
}
</style>
