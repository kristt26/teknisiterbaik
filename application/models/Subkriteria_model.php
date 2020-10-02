<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Subkriteria_model extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Periode_model');

    }

    public function select()
    {
        $kriteria = $this->db->get('kriteria')->result();
        foreach ($kriteria as $key => $value) {
            $value->subkriteria = $this->db->get_where('subkriteria', ['idkriteria' => $value->idkriteria])->result();
        }
        $periode = $this->Periode_model->get_periodeaktif();
        $bobot = $this->db->get_where('bobotsubkriteria', ['idperiode' => $periode['idperiode']])->result();
        return ['subkriteria' => $kriteria, 'bobot' => $bobot];
    }

    public function insert($params)
    {
        $this->db->insert('subkriteria', $params);
        $params['idsubkriteria'] = $this->db->insert_id();
        return $params;
    }

    public function add_bobot($params)
    {
        $periode = $this->Periode_model->get_periodeaktif();
        $data = $this->db->get_where('bobotsubkriteria', ['idperiode' => $periode['idperiode']])->result();
        if (count($data) > 0) {
            $this->db->trans_begin();
            foreach ($params as $key => $value) {
                $item = [
                    'bobot' => $value['nilai'],
                ];
                $this->db->where('idperiode', $periode['idperiode']);
                $this->db->where('idkriteria', $value['kriteria']['idkriteria']);
                $this->db->where('idkriteria1', $value['kriteria1']['idkriteria']);
                $this->db->update('bobotkriteria', $item);
            }
            if ($this->db->trans_status()) {
                $this->db->trans_commit();
                return true;
            } else {
                $this->db->trans_rollback();
                return false;
            }
        } else {
            $this->db->trans_begin();
            foreach ($params as $key => $value) {
                foreach ($value['item'] as $key1 => $value1) {
                    $a = $value1;
                    $item = [
                        'idkriteria' => $value['idkriteria'],
                        'idsubkriteria' => $value1['subkriteria']['idsubkriteria'],
                        'idsubkriteria1' => $value1['subkriteria1']['idsubkriteria'],
                        'bobot' => $value1['nilai'],
                        'idperiode' => $periode['idperiode'],
                    ];
                    $this->db->insert('bobotsubkriteria', $item);
                }
            }
            if ($this->db->trans_status()) {
                $this->db->trans_commit();
                return true;
            } else {
                $this->db->trans_rollback();
                return false;
            }
        }
    }

}

/* End of file ModelName.php */
