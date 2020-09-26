<?php
/*
 * Generated by CRUDigniter v3.2
 * www.crudigniter.com
 */

class Kriterium_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Periode_model');
        $this->load->model('Bobotkriterium_model');
    }

    /*
     * Get kriterium by idkriteria
     */
    public function get_kriterium($idkriteria)
    {
        return $this->db->get_where('kriteria', array('idkriteria' => $idkriteria))->row_array();
    }

    /*
     * Get all kriteria
     */
    public function get_all_kriteria()
    {
        $this->db->order_by('idkriteria', 'asc');
        $data['kriteria'] = $this->db->get('kriteria')->result_array();
        $periode = $this->db->get_where('periode', ['status' => 'true'])->result_array();
        if (count($periode) > 0) {
            $data['pembobotan'] = $this->db->get_where('bobotkriteria', ['idperiode' => $periode[0]['idperiode']])->result();
        }
        return $data;
    }

    /*
     * function to add new kriterium
     */
    public function add_kriterium($params)
    {
        $periode = $this->Periode_model->get_periodeaktif();
        $data = $this->Bobotkriterium_model->get_bobotkriterium($periode['idperiode']);
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
                $item = [
                    'idkriteria' => $value['kriteria']['idkriteria'],
                    'idkriteria1' => $value['kriteria1']['idkriteria'],
                    'bobot' => $value['nilai'],
                    'idperiode' => $periode['idperiode'],
                ];
                $this->db->insert('bobotkriteria', $item);
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

    /*
     * function to update kriterium
     */
    public function update_kriterium($idkriteria, $params)
    {
        $this->db->where('idkriteria', $idkriteria);
        return $this->db->update('kriteria', $params);
    }

    /*
     * function to delete kriterium
     */
    public function delete_kriterium($idkriteria)
    {
        return $this->db->delete('kriteria', array('idkriteria' => $idkriteria));
    }
}