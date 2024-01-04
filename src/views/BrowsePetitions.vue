<template>
  <Navbar></Navbar>
  <div class="container-fluid" style="height: 90dvh">
    <div class="row h-100">
      <div class="col-3 pt-3 d-none d-lg-block px-3 bg-danger text-white">
        <div class="container">
          <div class="row">
            <div class="col-12"><h3>Filtrele</h3></div>
          </div>
          <div class="row">
            <div class="col-12">
              <small>Kampanya ara</small>
              <div class="input-group mb-3">
                <input
                  @keyup="getPetitions"
                  v-model="filter.search"
                  type="text"
                  name="petition-search"
                  placeholder="Kampanya ara"
                  id="petition-search"
                  class="form-control"
                />
                <button class="btn btn-outline-danger text-white border-white align-bottom">Ara</button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <small>Kampanya türü</small>
              <select @change="getPetitions" name="petition-type" v-model="filter.type" id="petition-type" class="form-select">
                <option :value="0" selected>Bütün kampanyalar</option>
                <option :value="1">Popüler kampanyalar</option>
                <option :value="2">Yeni kampanyalar</option>
                <option :value="3">Başarılı kampanyalar</option>
              </select>
            </div>
          </div>
          <div class="row justify-content-center" style="height: 100%">
            <div class="col-12">
              <small>Konu başlığı</small>
              <ul class="list-group h-50 topic-list overflow-scroll">
                <li class="list-group-item" v-for="(t, i) in topics">
                  <input class="form-check-input me-1" type="checkbox" value="" :id="'topic_' + i" />
                  <label @click="setTopicFilter(t.ID)" class="form-check-label stretched-link" :for="'topic_' + i">{{ t.topic }}</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-9 h-100">
        <div class="container-fluid h-100 overflow-scroll">
          <div class="row mt-2 text-center">
            <div class="col" v-if="filter.search.trim() == ''"><h3>Kampanyalar</h3></div>
            <div class="col" v-else>
              <h3>Adında {{ filter.search }} bulunan Kampanyalar</h3>
            </div>
          </div>
          <!-- offcanvas filter -->
          <div class="row d-block d-lg-none">
            <div class="col-12">
              <button
                class="btn btn-danger"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                <i class="bi bi-sliders2"></i> Filtrele
              </button>

              <div
                ref="of"
                class="offcanvas offcanvas-start bg-danger text-white"
                data-bs-scroll="false"
                tabindex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
              >
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filtrele</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                  <div class="row">
                    <div class="col-12">
                      <small>Kampanya ara</small>
                      <div class="input-group mb-3">
                        <input
                          v-model="filter.search"
                          type="text"
                          name="petition-search-of"
                          placeholder="Kampanya ara"
                          id="petition-search-of"
                          class="form-control"
                        />
                        <button class="btn btn-outline-danger text-white border-white align-bottom">Ara</button>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <small>Kampanya türü</small>
                      <select name="petition-type-of" v-model="filter.type" id="petition-type-of" class="form-select">
                        <option :value="0" selected>Bütün kampanyalar</option>
                        <option :value="1">Popüler kampanyalar</option>
                        <option :value="2">Yeni kampanyalar</option>
                        <option :value="3">Başarılı kampanyalar</option>
                      </select>
                    </div>
                  </div>
                  <div class="row justify-content-center" style="height: 100%">
                    <div class="col-12">
                      <small>Konu başlığı</small>
                      <ul class="list-group h-50 topic-list overflow-scroll">
                        <li class="list-group-item" v-for="(t, i) in topics">
                          <input class="form-check-input me-1" type="checkbox" value="" :id="'of-topic_' + i" />
                          <label @click="setTopicFilter(t.ID, true)" class="form-check-label stretched-link" :for="'of-topic_' + i">{{
                            t.topic
                          }}</label>
                        </li>
                      </ul>
                      <div class="row">
                        <div class="col-12">
                          <button class="btn btn-danger border-white text-white w-100 mt-3" @click="getPetitions(1,true)">Filtrele</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BrowsepetitionCard v-for="petition in petitions" :petition="petition">
            <template v-slot:browsepetitionCardImage>
              <img :src="this.apiURL + petition.petitionImage" class="w-100 h-100 rounded-start" style="object-fit: fill" alt="..." />
            </template>
            <template v-slot:browsepetitionCardHeader>
              <h5 class="card-title">{{ petition.petitionHeader }}</h5>
            </template>
            <template v-slot:browsepetitionCardContent>
              <p class="card-text">{{ petition.petitionContent }}</p>
            </template>
            <template v-slot:browsepetitionCardButton>
              <div class="row mt-2">
                <div class="col-12 text-center">
                  <RouterLink :to="{ name: 'PetitionDetail', params: { ID: petition.ID } }" class="btn btn-danger text-decoration-none"
                    >Kampanyaya git</RouterLink
                  >
                </div>
              </div>
            </template>
          </BrowsepetitionCard>
          <div class="row">
            <div class="col-12">
              <ul class="pagination justify-content-center">
                <li class="page-item" @click="decPage" :class="{ disabled: this.page == 1 && this.page <= this.paginator }">
                  <button class="page-link"><i class="bi bi-arrow-left"></i></button>
                </li>
                <li class="page-item" @click="setPage(p)" :class="{ active: p == this.page }" v-for="p in paginator">
                  <button class="page-link">{{ p }}</button>
                </li>
                <li class="page-item" @click="incPage">
                  <button class="page-link" :class="{ disabled: this.page == this.paginator && this.paginator <= this.page }">
                    <i class="bi bi-arrow-right"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import Navbar from "../components/Shared/Navbar.vue";
import Footer from "../components/Shared/Footer.vue";
import BrowsepetitionCard from "../components/BrowsepetitionCard.vue";
import * as bootstrap from "bootstrap";
export default {
  components: {
    Navbar,
    BrowsepetitionCard,
    Footer,
  },
  computed: {
    paginator() {
      return Math.ceil(this.totalPetitions / this.offset);
    },
  },
  data() {
    return {
      of: null,
      filter: {
        search: "",
        topics: [],
        type: 0,
      },
      totalPetitions: 0,
      page: 1,
      petitions: [],
      topics: [],
      offset: 5,
    };
  },
  mounted() {
    this.setOf();
  },
  async beforeMount() {
    await this.getTopics();
    await this.getPetitions();
  },
  methods: {
    getPetitions(page = 1, offcanvas = false) {
      let link = `petitions/browsepetitions?page=${page}&offset=${this.offset}`;
      if (this.filter.search.trim() != "") {
        link = link.concat(`&s=${this.filter.search}`);
      }
      if (this.filter.topics.length > 0) {
        link = link.concat(`&t=${this.filter.topics}`);
      }
      if (this.filter.type != 0) {
        link = link.concat(`&ty=${this.filter.type}`);
      }
      this.$axios.get(link).then((res) => {
        this.petitions = res.data.petitions;
        this.totalPetitions = res.data.totalPetitions;
        if (offcanvas) {
          this.of.hide();
        }
        if (this.page > this.paginator) {
          this.page = 1;
        }
      });
    },
    getTopics() {
      this.$axios.get("gettopics").then((res) => {
        this.topics = res.data.topics;
      });
    },
    setTopicFilter(t, offcanvas = false) {
      if (this.filter.topics.includes(t)) {
        this.filter.topics = this.filter.topics.filter((topic) => {
          return topic != t;
        });
      } else {
        this.filter.topics.push(t);
      }
      if (!offcanvas) {
        this.getPetitions();
      }
    },
    disableBodyScrolling() {
      document.querySelector("#app").style.height = "100dvh";
    },
    enableBodyScrolling() {
      document.querySelector("#app").removeAttribute("style");
    },
    setOf() {
      this.of = new bootstrap.Offcanvas("#offcanvasExample");
      this.$refs.of.addEventListener("show.bs.offcanvas", (event) => {
        this.disableBodyScrolling();
      });
      this.$refs.of.addEventListener("hide.bs.offcanvas", (event) => {
        this.enableBodyScrolling();
      });
    },
    hideOf() {
      this.of.hide();
    },
    incPage() {
      if (this.page + 1 <= this.paginator) {
        this.page++;
        this.getPetitions(this.page);
      }
    },
    decPage() {
      if (this.page - 1 > 0) {
        this.page--;
        this.getPetitions(this.page);
      }
    },
    setPage(p) {
      this.page = p;
      this.getPetitions(this.page);
    },
  },
};
</script>

<style>
#sections .active {
  color: var(--dark-red) !important;
}
#sections .browse-link {
  color: black;
}
.topic-list {
  border-radius: 0.375rem;
}
.topic-list::-webkit-scrollbar {
  display: none;
}
</style>
